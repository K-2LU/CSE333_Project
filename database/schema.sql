create database hospital;
use hospital;

create table patient	(
	id varchar(20) primary key,
    count int(6),
    name varchar(64),
    phone varchar(15),
    age int(3) not null,
    sex varchar(10),
    password varchar(32)
);

create table doctor	(
	id varchar(20) primary key,
    count int(6),
    name varchar(64),
    degree varchar(64),
    college varchar(64),
    phone varchar(15),
    password varchar(32),
    dept_id varchar(64),
    room_no varchar(64)
);

create table usertype	(
	id varchar(20) primary key,
	phone varchar(15),
    u_type varchar(10),
    password varchar(32)
);

create table visit	(
	p_id varchar(20),
    d_id varchar(20),
    a_time datetime,
    a_status boolean
);

create table receptionist	(
	id varchar(20) primary key,
    name varchar(64),
    phone varchar(64),
    password varchar(32)
);

create table department (
	id varchar(20) primary key,
    name varchar(64)
);