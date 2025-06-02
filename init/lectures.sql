DROP TABLE IF EXISTS lectures;

CREATE TABLE lectures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255),
    day INTEGER,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    class_time INTEGER,
    abb_address VARCHAR(255),
    address TEXT
);

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴퓨터알고리즘(01)', 2, '12:30', '13:45', 44, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴퓨터알고리즘(01)', 5, '14:00', '15:15', 55, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴퓨터알고리즘(02)', 3, '08:00', '09:15', 11, '공학B159', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 159호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴퓨터알고리즘(02)', 5, '08:00', '09:15', 11, '공학B159', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 159호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴퓨터알고리즘(03)', 3, '11:00', '12:15', 33, '공학B159', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 159호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴퓨터알고리즘(03)', 5, '09:30', '10:45', 22, '공학B159', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 159호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(01)', 2, '12:30', '13:45', 44, '공학A107', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 107호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(01)', 5, '14:00', '15:15', 55, '공학A107', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 107호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(02)', 2, '11:00', '12:15', 33, '공학A107', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 107호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(02)', 4, '09:30', '10:45', 22, '공학A107', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 107호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(03)', 1, '14:00', '15:15', 55, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(03)', 3, '12:30', '13:45', 44, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(04)', 1, '17:00', '18:15', 77, '공학B151', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 151호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('데이터베이스(04)', 5, '15:30', '16:45', 66, '공학B151', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 151호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('운영체제(01)', 1, '15:30', '18:15', 67, '공대강당', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 공대강당');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('운영체제(02)', 1, '12:30', '13:45', 44, '공대강당', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 공대강당');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('운영체제(02)', 4, '14:00', '15:15', 55, '공대강당', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 공대강당');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(01)', 1, '11:00', '12:15', 33, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(01)', 3, '09:30', '10:45', 22, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(02)', 2, '11:00', '12:15', 33, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(02)', 4, '09:30', '10:45', 22, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(03)', 2, '09:30', '10:45', 22, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(03)', 5, '11:00', '12:15', 33, '공학B153', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 153호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(04)', 2, '12:30', '13:45', 44, '공학B151', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 151호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('정보통신공학(04)', 5, '14:00', '15:15', 55, '공학B151', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 151호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('오픈SW프로젝트', 2, '14:00', '15:15', 55, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('오픈SW프로젝트', 4, '15:30', '16:45', 66, '공학A125', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('인공지능(01)', 1, '14:00', '15:15', 55, '학551', '서울특별시 서대문구 이화여대길 52 이화여자대학교 학관 551호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('인공지능(01)', 3, '12:30', '13:45', 44, '학551', '서울특별시 서대문구 이화여대길 52 이화여자대학교 학관 551호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('인공지능(02)', 2, '15:30', '16:45', 66, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('인공지능(02)', 4, '12:30', '13:45', 44, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴파일러(01)', 2, '12:30', '13:45', 44, '공학A125-2', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125-2호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴파일러(01)', 5, '14:00', '15:15', 55, '공학A125-2', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125-2호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴파일러(02)', 3, '15:30', '16:45', 66, '공학A125', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('컴파일러(02)', 5, '12:30', '13:45', 44, '공학A125', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('캡스톤디자인과창업프로젝트B(01)', 1, '17:00', '18:15', 77, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('캡스톤디자인과창업프로젝트B(01)', 4, '15:30', '18:15', 67, '공학B161', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 161호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('캡스톤디자인과창업프로젝트B(02)', 1, '17:00', '18:15', 77, '학251', '서울특별시 서대문구 이화여대길 52 이화여자대학교 학관 251호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('캡스톤디자인과창업프로젝트B(02)', 4, '15:30', '18:15', 67, '공대강당', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 공대강당');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('가상현실(01)', 2, '11:00', '12:15', 33, '공학A223', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 223호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('가상현실(01)', 4, '09:30', '10:45', 22, '공학A223', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 223호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('가상현실(02)', 2, '08:00', '09:15', 11, '공학A125', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('가상현실(02)', 4, '08:00', '09:15', 11, '공학A125', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 125호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('현대암호기초', 3, '11:00', '12:15', 33, '공학B151', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 151호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('현대암호기초', 5, '09:30', '10:45', 22, '공학B151', '서울특별시 서대문구 이화여대길 52 이화여자대학교 신공학관 151호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('네트워크보안', 1, '11:00', '12:15', 33, '공학A101', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 101호');

INSERT INTO lectures (name, day, start_time, end_time, class_time, abb_address, address)
VALUES ('네트워크보안', 4, '09:30', '10:45', 22, '공학A101', '서울특별시 서대문구 이화여대길 52 이화여자대학교 아산공학관 101호');

