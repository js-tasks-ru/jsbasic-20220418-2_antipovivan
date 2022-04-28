function showSalary(users, age) {
  let filtered = users.filter((elem) => elem.age<=age);
  return filtered.map((elem) => elem.name + ', ' + elem.balance + '\n').join('').slice(0,-1)
}

