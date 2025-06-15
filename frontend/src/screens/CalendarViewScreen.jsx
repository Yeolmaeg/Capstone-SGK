import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarTopBar from "../components/CalendarTopBar";
import { useSwipeable } from "react-swipeable";
import "../styles/custom.css";
import { getSchedules } from "../api/schedule";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const CalendarViewScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth() + 1;

// ✅ DB에서 일정 불러오기
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const data = await getSchedules(user_id);

        // ✅ 일정 형식 변환
        const formatted = data.map((e) => ({
          id: e.id,
          title: e.title || "제목 없음",
          start: new Date(e.start_time),
          end: new Date(e.end_time),
          address: e.address || "주소 없음",
          color: e.color || "#3174ad",
        }));

        console.log("📅 불러온 일정:", formatted);
        setEvents(formatted);
      } catch (err) {
        console.error("❌ 일정 불러오기 실패:", err);
      }
    };

    fetchSchedules();
  }, []);

  const handleMonthChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleSwipeLeft = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const handleSwipeRight = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div style={styles.container}>
      <CalendarTopBar
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <div {...swipeHandlers} style={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          date={currentDate}
          onNavigate={setCurrentDate}
          defaultView="month"
          toolbar={false}
          selectable
          longPressThreshold={10}
          events={events}
          onSelectSlot={(slotInfo) => {
            const clickedDate = slotInfo.start;
            setSelectedDate(clickedDate);
            navigate("/timelineview", {
              state: { startDate: clickedDate },
            });
          }}
          onSelectEvent={(event) => {
            const eventDate = moment(event.start).startOf("day").toDate();
            setSelectedDate(eventDate);
            navigate("/timelineview", {
              state: { startDate: eventDate },
            });
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#3174ad",
              color: "#fff",
              borderRadius: "4px",
              padding: "2px 4px",
              fontSize: "10px",
              fontWeight: "bold",
              border: "none",
              lineHeight: "1.2",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          })}
          dayPropGetter={(date) => {
            const isSelected =
              selectedDate && moment(date).isSame(selectedDate, "day");
            if (isSelected) {
              return {
                className: "custom-selected-day",
              };
            }
            return {};
          }}
          popup
          style={styles.calendar}
        />
      </div>
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
  calendarWrapper: {
    flexGrow: 1,
    height: "calc(100% - 50px)",
    paddingTop: "50px",
    position: "relative",
  },
};

export default CalendarViewScreen;
