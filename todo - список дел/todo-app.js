(function () {

   function createAppTitle(title) {
      let appTitle = document.createElement('h2');
      appTitle.innerHTML = title;
      return appTitle;
   }

   function createTodoItemForm() {
      let form = document.createElement('form');
      let input = document.createElement('input');
      let buttonWrapper = document.createElement('div');
      let button = document.createElement('button');

      form.classList.add('input-group', 'mb-3');
      input.classList.add('form-control');
      input.placeholder = 'Введите значение нового дела';
      buttonWrapper.classList.add('input-group-append');
      button.classList.add('btn', 'btn-primary');
      button.textContent = 'Добавить дело';

      buttonWrapper.append(button);
      form.append(input);
      form.append(buttonWrapper);
      return {
         form,
         input,
         button,
      };
   }

   function createTodoList() {
      let list = document.createElement('ul');
      list.classList.add('list-group');
      return list;
   }

   function createTodoItem(cases) {
      let item = document.createElement('li');
      let buttonGroup = document.createElement('div');
      let doneButton = document.createElement('button');
      let deleteButton = document.createElement('button');

      item.textContent = cases;

      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');


      buttonGroup.classList.add('btn-group', 'btn-group-sm');
      doneButton.classList.add('btn', 'btn-success');
      doneButton.textContent = 'Готово';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Удалить';

      buttonGroup.append(doneButton);
      buttonGroup.append(deleteButton);
      item.append(buttonGroup);

      return {
         item,
         doneButton,
         deleteButton,
      };
   };

   function createTodoApp(container, title = 'Список дел', key) {
      let arrLS = [];
      let allArrayLS;
      let fromLS;
      let todoAppTitle = createAppTitle(title);
      let todoItemForm = createTodoItemForm();
      let todoList = createTodoList();

      container.append(todoAppTitle);
      container.append(todoItemForm.form);
      container.append(todoList);

      document.querySelector('.btn').setAttribute('disabled', 'disabled');

      if (!todoItemForm.input.value) {
         document.querySelector('.btn').setAttribute('disabled', 'disabled');
      };

      document.querySelector('.form-control').addEventListener('input', function one() {


         if (document.querySelector('.form-control').value.length >= 1) {
            document.querySelector('.btn').removeAttribute('disabled')
         }
         else {
            document.querySelector('.btn').setAttribute('disabled', 'disabled')
         };
      });

      todoItemForm.form.addEventListener('submit', function (e) {
         e.preventDefault();

         if (!todoItemForm.input.value) {
            return;
         };

         let todoItem = createTodoItem(todoItemForm.input.value);

         todoItem.doneButton.addEventListener('click', function () {
            todoItem.item.classList.toggle('list-group-item-success');

            let k = JSON.parse(localStorage.getItem(key));
            for (let i = 0; i < k.length; i++) {
               k[i].done = todoList.querySelectorAll('.list-group-item')[i].classList.contains('list-group-item-success');
            }
            localStorage.setItem(key, JSON.stringify(k));
         });

         todoItem.deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
               todoItem.item.remove();
               if (todoList.querySelectorAll('.list-group-item').length === 0) {
                  localStorage.removeItem(key);
                  }
                  else {
                     arrLS = [];
                     for (let n = 0; n < todoList.querySelectorAll('.list-group-item').length; n++) {
                        const objAfterDel = new Object();
                        objAfterDel.name = todoList.querySelectorAll('.list-group-item')[n].firstChild.textContent;
                        objAfterDel.done = todoList.querySelectorAll('.list-group-item')[n].classList.contains('list-group-item-success');
                        arrLS.push(objAfterDel);
                        localStorage.setItem(key, JSON.stringify(arrLS));
                     };
                  };
               };
            });

         todoList.append(todoItem.item);

         todoItemForm.input.value = '';

         document.querySelector('.btn').setAttribute('disabled', 'disabled');

         const objLS = new Object();
         objLS.name = todoItem.item.firstChild.textContent;
         objLS.done = false;

         arrLS.push(objLS);
         if (fromLS === null) {
            allArrayLS = arrLS;
         } else {
            allArrayLS = fromLS.concat(arrLS);
         };
         localStorage.setItem(key, JSON.stringify(allArrayLS));
         
      });

      window.onload = function () {
         fromLS = JSON.parse(localStorage.getItem(key));
         if (localStorage.getItem(key) !== null) {
            let arrFromLS = JSON.parse(localStorage.getItem(key));

            arrFromLS.forEach(function (el) {
               let readyCases = createTodoItem(el.name).item;
               todoList.append(readyCases);

               if (el.done) {
                  readyCases.classList.add('list-group-item-success');
               };

               readyCases.querySelector('.btn-success').addEventListener('click', function () {
                  readyCases.classList.toggle('list-group-item-success');
                  let arrFromLSForDone = JSON.parse(localStorage.getItem(key));
                  for (let i = 0; i < arrFromLSForDone.length; i++) {
                     arrFromLSForDone[i].done = todoList.querySelectorAll('.list-group-item')[i].classList.contains('list-group-item-success');
                  };
                  localStorage.setItem(key, JSON.stringify(arrFromLSForDone));
               });

               readyCases.querySelector('.btn-danger').addEventListener('click', function () {
                  if (confirm('Вы уверены?')) {
                     readyCases.remove();

                     if (todoList.querySelectorAll('.list-group-item').length === 0) {
                        localStorage.removeItem(key);
                        }
                        else {
                        arrLS = [];
                           for (let i = 0; i < todoList.querySelectorAll('.list-group-item').length; i++) {
                              const objFromLSForDel = new Object();
                              objFromLSForDel.name = todoList.querySelectorAll('.list-group-item')[i].firstChild.textContent;
                              objFromLSForDel.done = todoList.querySelectorAll('.list-group-item')[i].classList.contains('list-group-item-success');
                              arrLS.push(objFromLSForDel);
                              localStorage.setItem(key, JSON.stringify(arrLS));
                           }
                           fromLS = [];
                        };
                  };
               });
            });
         };
      };
   };

   window.createTodoApp = createTodoApp;
})();