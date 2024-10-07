# Описание
Клиентская часть CRM системы для управления школой.

Предназначена для школы программирования [_Программика_](https://xn--80aahvkkamikc.xn--p1ai/index.html)

## Стек
### Frontend
Освновная библиотека: _React_

Библиотеки компонентов: _Reactstrap, Ag-grid и Chart.js_

Стили: SCSS

Для дат и времени: _moment.js_

Верстка: Шаблон взят с [ Creative Tim ](https://www.creative-tim.com/)

### Backend
Библиотека: _Express_

База данных: _Mysql_

# Функционал
### 1. Расписание (/schedule)
Основное окно приложения с расписанием уроков



<table>
    <tr>
       <td colspan="2">
          <img src="https://github.com/user-attachments/assets/10977450-9b89-4eda-bdec-f5a577a82eed" />
       </td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/848935af-9887-49d6-8ea0-633d1948b229" /></td>
      <td><img src="https://github.com/user-attachments/assets/18251cc3-b13f-486f-894f-fb830df3d9ec" /></td>
    </tr>

</table>

При нажатии на урок открывается модальное окно, со списком студентов, которые должны присутствовать на уроке.

Окно добавления урока:
> При выборе направления, выдается список студентов с этого направления.
> 
> При выборе _Включить всех студентов_, дается возможность записать на урок студентов с других направлений.

### 2. Главная (/index)
Размещена таблица с отображением посещаемости студентов и количеством оплаченных/не оплаченных уроков по месяцам.
![image](https://github.com/user-attachments/assets/910a6a0f-cab4-41ec-b518-d947ad4a26f0)

### 3. Финансы (/finance)
Экран с доходами/прибылью, которые строятся на основе оплаченных уроков и дополнительных расходов/доходов, отображаеммых в панеле _Операции_
![image](https://github.com/user-attachments/assets/2c49568e-4b89-400c-bf73-67f5c6261d00)


### 4. Оплата (/debts)
Экран с задолженностями студентов и графиками _Доход_ с уроков и _Не оплачено_ по студентам.
![image](https://github.com/user-attachments/assets/339f2535-3443-40f0-a878-6efc2b3df18f)


При нажатии кнопки _Посмотреть_ открывается модальное окно со всеми задолженностями студента
![image](https://github.com/user-attachments/assets/e5273f3c-200b-48cc-855e-931d86593ec3)

### 5. Студенты (/students)
Экран со всеми студентами и добавлением новых
![image](https://github.com/user-attachments/assets/748f8a06-8429-4deb-b744-fcdd29b149d4)


