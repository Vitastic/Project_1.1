 window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

      

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
     
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++ ) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer
    
    let deadline = '2020-06-02'; // Устанавливаем дату дедлайна!

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor( t/1000/60/60 );

        return {
            'total' : t,
            'hours' : hours,
            'minutes': minutes,
            'seconds' : seconds
        };              

    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval =setInterval(updateClock,1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = ('0' + t.minutes).slice(-2);
            seconds.textContent = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }              

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash'); // Добавили анимацию кнопке more!
        document.body.style.overflow = 'hidden'; // Запретили пролистывать основной контент
    });
    
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.add('more-splash');
        document.body.style.overflow = '';//Разрешили опять пролистывать
    });


    // Функция вызова модального окна из табов
    let descriptionBtn = document.querySelectorAll('.description-btn');

    descriptionBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; 
        });
    });
   
    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'); //Создаем окошко для вывода сообщения

        statusMessage.classList.add('status'); //Подключаем для div стиль status

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // отменяем стандартное поведение браузера
        form.appendChild(statusMessage); //Создаем div для сообщения пользователю

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');// для обычных данных form
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');//для передачи в формате json 

        let formData = new FormData(form); 
        
        let obj = {};                               //для передачи в формате json
        formData.forEach(function(value,key) {      //для передачи в формате json
            obj[key] = value;                       //для передачи в формате json 
        });                                         //для передачи в формате json            
        let json = JSON.stringify(obj);             //для передачи в формате json


        //request.send(formData); // для передачи данных в обычном формате
        request.send(json);   //для передачи в формате json     

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

            //Очищаем все наши input!!!
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }

    });

    // Slider

    let slideIndex =1, // Номер включенного слайда
        slides = document.querySelectorAll('.slider-item'), // Получаем все слайды, которые есть на странице.
        prev = document.querySelector('.prev'), // Получаем кнопку назад (влево).
        next = document.querySelector('.next'), // Получаем кнопку вперед (вправо).
        dotsWrap = document.querySelector('.slider-dots'), //Получаем точки слайдера.
        dots = document.querySelectorAll('.dot'); // Получаем отдельные точки слайдера.

    showSlides(slideIndex);

        // Функция, скрывающая все слайды кроме нужного, тушим ненужные точкию
    function showSlides(n) {

        if (n > slides.length) { //если слайды закончились, то переходим к первому слайду
            slideIndex = 1;
        }
        if (n < 1) { //если слайды закончились влево, то переходим к последнему слайду
            slideIndex = slides.length;
        }


        slides.forEach((item) => item.style.display = 'none'); //тушим все слайды
        //for (let i = 0; i < slides.length; i++) {              //тушим все слайды в старом стиле JS    
        //    slides[i].style.display = 'none';
        //};
        dots.forEach((item) => item.classList.remove('dot-active')); //деактивируем точки(удаляем класс точек)

        slides[slideIndex - 1].style.display = 'block'; //Показываем нужный слайд.
        dots[slideIndex - 1].classList.add('dot-active');//Активируем соответствующую точку.

    }    

        //Функция, которая увеличивает slideIndex при листании
    function plusSlides(n) {
        showSlides(slideIndex += n ); //сразу показываем следующий слайд.
    } 
         //Функция, которая определяет текущий слайд и устанавливает его 
    function currentSlide(n) {
        showSlides(slideIndex = n ); // показываем текущий слайд.
    } 
     
    prev.addEventListener('click', function() { //отрабатываем событие листания влево.
        plusSlides(-1);
    });

    next.addEventListener('click', function() { //отрабатываем событие листание вправо
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) { //отрабатываем событие нажатия на точку под слайдером
        for (let i = 0; i < dots.length + 1; i++) { //находим нажатую точку
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });


    // Calc
    
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total');


    console.log(totalValue);

 }); 
