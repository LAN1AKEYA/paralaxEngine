# paralaxEngine

<b>paralaxEngine</b> - это простая библиотека для подключения паралакс-эффекта для любых html-элементов. Для работы этой библиотеки не нужны никакие дополнительные инструменты. Библиотека реализована на нативном js, благодаря чему ее можно подключить к проекту любой сложности.

## Подключение библиотеки

Для интеграции библиотеки в ваш проект достаточно склонировать библиотеку в ваш рабочий каталог и подключить главный рабочий файл paralaxEngine.js в конце html документа.

## Раздача идентификаторов и классов

Первым делом необходимо указать в index идентефикаторы элементов и дать родителям, относительно которых будут перемещаться элеметны класс <code>[id элемента]-PAPA</code>.

<b>Например:</b>

    <section class="myElement-PAPA">
        <div id="myElement"></div>
    </section>

### Настройка конфигурационного файла

<b>paralaxConfig.json</b> - основной конфигурационный файл. После запуска библиотеки все параметры передаются в рабочий файл paralaxEngine.js.

paralaxConfig.json хранит в себе следующие параметры:

<table>
    <tr align="left">
        <th>
            <b>КЛЮЧ</b>
        </th>
        <th>
            <b>ЗНАЧЕНИЕ</b>
        </th>
    </tr>
    <tr>
        <td>
            <code>run</code>
        </td>
        <td>
            Булевое значение, включает/выключает работу библиотеки.
        </td>
    </tr>
        <tr>
        <td>
            <code>elements</code>
        </td>
        <td>
            Набор объектов, описывающих все элементы, подключенные к библиотеке. Каждый объект - один паралакс-элемент. Описание параметров, хранящихся в объектах будут ниже.
        </td>
    </tr>
        <tr>
        <td>
            <code>developeMode</code>
        </td>
        <td>
            Включение и настройка режима разработчика. Добавляет направляющие, подсветку паралакс-блоков и вывод в консоль информации о состоянии элементов.
        </td>
    </tr>
</table>

### elements

Для того, чтобы паралак-эффект наложился на html-элемент, необходимо описать его в качестве объекта, находящегося в массиве "elements".

Объект может хранить в себе следующие параметры:

<table>
    </tr>
        <tr>
        <td>
            <b>КЛЮЧ</b>
        </td>
        <td>
            <b>ЗНАЧЕНИЕ</b>
        </td>
    </tr>
    <tr>
        <th colspan=2>
            <b>ОБЯЗАТЕЛЬНЫЕ ПАРАМЕТРЫ</b>
        </th>
    </tr>
        <tr>
            <td>
                <code>id</code>
            </td>
            <td>
                Идентификатор элемента
            </td>
    </tr>
    <tr>
        <td>
            <code>ratio</code>
        </td>
        <td>
            Индекс, указывающий скорость перемещения элемента относительно родителя в процентах (например 50 - это половина от скорости скролла родителя).
        </td>
    </tr>
    <tr>
        <th colspan=2>
            <b>НЕОБЯЗАТЕЛЬНЫЕ ПАРАМЕТРЫ</b>
        </th>
    </tr>
        <tr>
        <td>
            <code>mode</code>
        </td>
        <td>
            Режим обработки, где 'this' - перемещение самого элемента, 'background' - перемещение background-image (изначально this).
        </td>
    </tr>
    <tr>
        <td>
            <code>alwaysProcessing</code>
        </td>
        <td>
            Обработка положения элемента, где false - обработка только в случае, если элемент в области видимости, а true - постоянная обработка без зависимости от того, в какой точке документа находится пользователь (изначально false).
        </td>
    </tr>
</table>

<i>НЕ РЕКОМЕНДУЕТСЯ устанавиливать параметр alwaysProcessing в состояние true для всех элементов в случае, если их много, т.к. это сильно нагрузит браузер.  
Данный параметр полезен в случае, если размер элемента равен размеру родителя (в этом случае могут возникать ошибки отображения при первом фокусе на элементе).</i>

Так же можно добавить паралакс-элемент с использованием js. Для этого можно вызвать функцию paralaxAddElement() и передать в нее все необходимые параметры.


<b>Пример вызова функции:</b>

    paralaxAddElement(
        [
            { id: 'content', ratio: 120 },
            { id: 'section', ratio: 115, mode: 'background' },
            { id: 'image', ratio: 94, alwaysProcessing: true },
        ]
    );

### develope mode

<b>developeMode</b> - объект, хранящий в себе настройки режима разработчика. Его можно использовать для отладки конфигурации.

<table>
    <tr align="left">
        <th>
            <b>КЛЮЧ</b>
        </th>
        <th>
            <b>ЗНАЧЕНИЕ</b>
        </th>
    </tr>
    <tr>
        <td>
            <code>run</code>
        </td>
        <td>
            Булевое значение, включает/выключает режим разработчика.
        </td>
    </tr>
    <tr>
        <td>
            <code>lineWidth</code>
        </td>
        <td>
            Толщина направляющих в пикселях. Направляющие можно отключить, передав параметр <code>0</code>.
        </td>
    </tr>
    <tr>
        <td>
            <code>lineColor</code>
        </td>
        <td>
            Цвет направляющих. Стандартное состояние (пустая строка) - режим наложения "инверсия". Данный параметр может принять в себя цвет в любых допустимых css-форматах (rgb, rgba, HEX и т.п.).
        </td>
    </tr>
    <tr>
        <td>
            <code>ghostColor</code>
        </td>
        <td>
            Цвет ghost-блоков. Стандартное состояние (пустая строка) - наложение красного цвета. Окрашивание ghost-блоков можно выключить, передав параметр <code>none</code>. По аналогии с предыдущим пунктом, принимает в себя цвет в любом допустимом css-форматом.
        </td>
    </tr>
    <tr>
        <td>
            <code>consoleOutput</code>
        </td>
        <td>
            Булевое значение, включает/выключает оповещение в консоли в случае, на экране пользователя видно элемент.
        </td>
    </tr>
</table>

## Лицензия

Данная библиотека свободна для использования, изменения и распространения. Вы можете её модифицировать для получения лучшего результата. Фиксы багов и добавление нового функционала приветствуется.