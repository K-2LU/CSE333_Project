use hospital;

insert into department(id, name) values ('DEPT-001', 'General Practition(GP)');
insert into department(id, name) values ('DEPT-002', 'Diagnostic Medicine');

select * from department;
select * from doctor;

insert into doctor(id, name, degree, college, phone, password, dept_id, room_no) 
	values ('DOC-0001', 'Ibn Sina', 'MD', 'Sylhet Osmani Medical College', '01712345662',
			'ibn_sina', 'DEPT-001', '102A');

insert into doctor(id, name, degree, college, phone, password, dept_id, room_no) 
	values ('DOC-0002', 'Murli Prasad Sharma', 'MBBS', 'Sylhet Osmani Medical College', '01712345667',
			'munnavai', 'DEPT-001', '101A');

insert into doctor(id, name, degree, college, phone, password, dept_id, room_no) 
	values ('DOC-0003', 'Dr. Gregory House', 'MD', 'Prinston Medical College', '01189998819991197253',
			'house1234', 'DEPT-002', '201A');

insert into visit(id, p_id, d_id, a_time, a_status) values ('002', '001', '002', '2023-11-09 00:00', false);

select * from visit;
SELECT * FROM hospital.usertype;

insert into usertype(id, u_type, password) values('DOC-0001', 'Doc', 'ibn_sina');
insert into usertype(id, u_type, password) values('DOC-0002', 'Doc', 'munnavai');
insert into usertype(id, u_type, password) values('DOC-0003', 'Doc', 'house1234');