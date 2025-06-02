import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import moment from "moment";
import { useSwipeable } from "react-swipeable";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/custom.css";
import TimelineTopBar from "../components/TimelineTopBar";
import FloatingButton from "../components/FloatingButton";
import PlaceModal from "../components/PlaceModal";
import Event from "../components/Event";
import { getSchedules } from "../api/schedule"; 



const localizer = momentLocalizer(moment);

const CustomThreeDayView = (props) => {
  const { date, ...rest } = props;
  const range = Array.from({ length: 3 }, (_, i) =>
    moment(date).clone().add(i, "days").toDate()
  );
  return (
    <TimeGrid
      {...rest}
      range={range}
      eventOffset={15}
      showNowIndicator
      scrollToTime={moment().startOf("day").toDate()}
      min={moment().startOf("day").toDate()}
      max={moment().endOf("day").add(1, "days").toDate()}
      style={{ height: "100%", overflowY: "scroll" }}
    />
  );
};

CustomThreeDayView.title = (date) => {
  return `3-day view: ${moment(date).format("M월 D일")} ~ ${moment(date)
    .add(2, "days")
    .format("D일")}`;
};

CustomThreeDayView.navigate = (date, action) => {
  switch (action) {
    case "PREV":
      return moment(date).subtract(3, "days").toDate();
    case "NEXT":
      return moment(date).add(3, "days").toDate();
    default:
      return date;
  }
};

CustomThreeDayView.range = (date) => [
  moment(date).toDate(),
  moment(date).add(2, "days").toDate(),
];

const TimelineViewScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [buttonPosition, setButtonPosition] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
   

  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handlers = useSwipeable({
    onSwipedLeft: () => changeDate(1),
    onSwipedRight: () => changeDate(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const changeDate = (direction) => {
    const newDate = moment(currentDate).add(direction * 3, "days").toDate();
    setCurrentDate(newDate);
    setSelectedYear(moment(newDate).year());
    setSelectedMonth(moment(newDate).month() + 1);
  };

  const handleSelectSlot = ({ start }) => {
    const startMoment = moment(start);
    const endMoment = startMoment.clone().add(1, "hour");
    const slot = { start: startMoment.toDate(), end: endMoment.toDate() };
    setSelectedSlot(slot);

    setTimeout(() => {
      const calendarEl = calendarRef.current;
      if (!calendarEl) return;
      const slotRect = calendarEl
        .querySelector(".rbc-day-slot .rbc-time-slot.selected-slot")
        ?.getBoundingClientRect();
      const containerRect = calendarEl.getBoundingClientRect();

      if (slotRect && containerRect) {
        const top = slotRect.top - containerRect.top;
        const left = slotRect.left - containerRect.left;
        setButtonPosition({ top: top - 35, left });
      }
    }, 0);
  };

  const handleSelectEvent = (event) => {
    console.log("선택된 이벤트 데이터:", event);

    if (event.isRecommended) {
    navigate("/recommendationdetail", { state: { event } });
  } else {
    navigate("/scheduledetail", { state: { event } });
  }
  };

  const slotPropGetter = (date) => {
    const isSame =
      selectedSlot && moment(date).isSame(moment(selectedSlot.start), "minute");
    return {
      className: isSame ? "selected-slot" : "",
    };
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const popup = document.querySelector(".popup-button-container");
      if (popup && !popup.contains(e.target)) {
        setSelectedSlot(null);
        setButtonPosition(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const user_id = "b0448e3d-7b24-4119-83a5-7bab4ebcc0d0";
        const data = await getSchedules(user_id);
  
        const formatted = data.map((e) => ({
          ...e,
          start: new Date(e.start_time),
          end: new Date(e.end_time),
          place: e.address,
          color: e.color || "#3174ad",
          isRecommended: e.source === "recommendation",  // 추천 여부 추가
          place_id: e.place_id,
        }));
  
        // ✅ 중복 제거 (id 기준)
        const unique = [];
        const seen = new Set();
        for (const e of formatted) {
          if (!seen.has(e.id)) {
            seen.add(e.id);
            unique.push(e);
          }
        }
  
        setEvents(unique);
      } catch (err) {
        console.error("❌ 일정 불러오기 실패:", err);
      }
    };
  
    fetchSchedules();
  }, []);

  useEffect(() => {
    const state = location.state;
    if (state?.newEvent) {
      console.log("📦 새 일정 감지됨:", state.newEvent);
  
      const newEvent = {
        ...state.newEvent,
        start: new Date(state.newEvent.start),
        end: new Date(state.newEvent.end),
        place_id: state.newEvent.place_id,
      };

      console.log("🔥 최종 newEvent:", newEvent);
  
      setEvents((prev) => {
        const isDuplicate = prev.some((e) => e.id === newEvent.id);
        if (isDuplicate) return prev;
        return [...prev, newEvent];
      });
  
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.key]);
  

  useEffect(() => {
    const deletedEvent = location.state?.deletedEvent;
    if (deletedEvent) {
      setEvents((prev) =>
        prev.filter(
          (e) =>
            e.title !== deletedEvent.title ||
            e.start.getTime() !== new Date(deletedEvent.start).getTime() ||
            e.end.getTime() !== new Date(deletedEvent.end).getTime()
        )
      );
      navigate("/timelineview", { replace: true });
    }
  }, [location]);

  useEffect(() => {
    const startDate = location.state?.startDate;
    if (startDate) {
      const start = moment(startDate).startOf("day").toDate();
      setCurrentDate(start);
      setSelectedYear(moment(start).year());
      setSelectedMonth(moment(start).month() + 1);
    }
  }, [location]);

  useEffect(() => {
    const updatedEvent = location.state?.updatedEvent;
    if (updatedEvent) {
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      navigate("/timelineview", { replace: true, state: null });
    }
  }, [location]);
  
  return (
    <div style={styles.container} {...handlers}>
      <TimelineTopBar
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onMonthChange={(newDate) => {
          setCurrentDate(newDate);
          setSelectedYear(moment(newDate).year());
          setSelectedMonth(moment(newDate).month() + 1);
        }}
      />
      <div ref={calendarRef} style={styles.timelineWrapper}>
        <Calendar
          localizer={localizer}
          date={currentDate}
          defaultView="threeDay"
          views={{ threeDay: CustomThreeDayView }}
          events={events}
          style={{ height: "100%" }}
          toolbar={false}
          selectable
          step={30}
          timeslots={2}
          onNavigate={() => {}}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          slotPropGetter={slotPropGetter}
          components={{ event: Event }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#3174ad",
              color: "#fff",
              borderRadius: "4px",
              padding: "4px 6px",
              border: "none",
            },
          })}
        />
        {buttonPosition && selectedSlot && (
          <div
            className="popup-button-container"
            style={{
              position: "absolute",
              top: buttonPosition.top,
              left: buttonPosition.left,
              display: "flex",
              gap: "8px",
              zIndex: 1000,
            }}
          >
            <button
              className="popup-button"
              onClick={() =>
                navigate("/addschedule", { state: { selectedSlot } })
              }
            >
              일정 추가
            </button>
            <button
              className="popup-button"
              onClick={() =>
                navigate("/recommendation", { state: { selectedSlot } })
              }
            >
              장소 추천
            </button>
          </div>
        )}
      </div>
      {!isModalOpen && <FloatingButton onClick={() => setModalOpen(true)} />}
      {isModalOpen && <PlaceModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
  },
  timelineWrapper: {
    flexGrow: 1,
    height: "calc(100% - 50px)",
    paddingTop: "50px",
    position: "relative",
  },
};

export default TimelineViewScreen;