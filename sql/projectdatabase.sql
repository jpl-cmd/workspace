CREATE DATABASE IF NOT EXISTS projectdb;

USE projectdb;

CREATE TABLE IF NOT EXISTS notes (
    note_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(20) NULL,
    content VARCHAR(8000) NULL,
    create_date DATE NOT NULL,
    PRIMARY KEY (note_id)
);



INSERT INTO notes (title,content,create_date) VALUES ("Placeholder Title","Placeholder Main Text","2019-12-09");


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysqlroot';
