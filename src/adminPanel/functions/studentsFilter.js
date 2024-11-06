export function studentsFilter(students, filterName) {
  const name = new RegExp(filterName, "i");
  let newStudents = [];

  for (let index = 0; index < students.length; index++) {
    const student = students[index];
    const fullName = student.first_name + " " + student.last_name;
    if (filterName === "" || (filterName !== "" && name.test(fullName)))
      newStudents.push(student);
  }
  return newStudents;
}
