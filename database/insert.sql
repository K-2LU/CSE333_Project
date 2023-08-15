use hospital;

insert into department(id, name) values ('DEPT-002', 'Diagnostic Medicine');

select * from department;
select * from doctor;
insert into doctor(id, name, degree, college, phone, password, dept_id, room_no) 
	values ('DOC-0002', 'Murli Prasad Sharma', 'MBBS', 'Sylhet Osmani Medical College', '01712345667',
			'munnavai', 'DEPT-001', '101A');
