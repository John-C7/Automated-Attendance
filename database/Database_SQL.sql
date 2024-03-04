CREATE DATABASE DBMS12;
USE DBMS12;

CREATE TABLE `Course` (
  `id` INT PRIMARY KEY,
  `name` VARCHAR(255)
);

INSERT INTO Course (id, name) VALUES
(1, 'CSE'),
(2, 'ISE');

CREATE TABLE `Subject` (
  `id` INT PRIMARY KEY,
  `name` VARCHAR(255),
  `course_id` INT,
  FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`)
);

INSERT INTO Subject (id, name, course_id) VALUES
(1, 'DBMS', 1),
(2, 'CN', 1),
(3, 'ATC', 1),
(4, 'AI', 1),
(5, 'EVS', 1),
(6, 'DBMS', 2),
(7, 'CN', 2),
(8, 'ATC', 2),
(9, 'RM', 2),
(10, 'C#', 2);

CREATE TABLE `students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `USN` VARCHAR(45) NOT NULL,
  `First_Name` VARCHAR(45) NOT NULL,
  `Last_Name` VARCHAR(45) NOT NULL,
  `Course` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) DEFAULT NULL,
  `Photo` LONGBLOB,
  PRIMARY KEY (`id`,`USN`),
  INDEX `idx_usn` (`USN`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `teachers` (
  `slno` INT NOT NULL AUTO_INCREMENT,
  `Reg_no` VARCHAR(45) NOT NULL,
  `Firstname` VARCHAR(45) NOT NULL,
  `Lastname` VARCHAR(45) NOT NULL,
  `Subjects` VARCHAR(255) NOT NULL,
  `Email_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`slno`,`Reg_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO teachers (slno, Reg_no, Firstname, Lastname, Subjects, Email_id) VALUES
(4, 'Reg_no_1', 'Firstname_1', 'Lastname_1', '1,2', 'email1@example.com'),
(5, 'Reg_no_2', 'Firstname_2', 'Lastname_2', '3,4', 'email2@example.com'),
(6, 'Reg_no_3', 'Firstname_3', 'Lastname_3', '5', 'email3@example.com');

CREATE TABLE `attendance` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_usn` VARCHAR(45) NOT NULL,
  `subject_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('present', 'absent') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`student_usn`) REFERENCES `students`(`USN`),
  FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SELECT * FROM ATTENDANCE;
