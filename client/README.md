# Project Melon Bread

---

### Baking Scheduler

<!-- [![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://github.com/vuejs/vue-next) -->

[![beta](https://img.shields.io/npm/v/vue/next.svg)](https://www.npmjs.com/package/vue/v/next)

---

Early Rendition of Schedule Page

![Schedule](https://raw.githubusercontent.com/MarcusYSera/vue-recipe-app/master/client/img/ScheduleView_v3.png)

---

### Notes

- Vue3, Vue cli 4

- Utilizing Semantic HTML5 to increase SEO readability

- Grid

- Flexbox

- assets used by iframe are sourced from public path instead of src

- assets used by img are sourced from relative src path

---

### TO-DO

add edit for to-do tasks

enable editting of to-do list items: allow a user to go back and reselect start time or end time

add in recipe page - enable association of recipe with to-do item - create baking timelines

currently working on displaying current selected date

refactor v-for loops, recursive calls are slowing down rendering speed, move methods without arguments to computed, so it caches

add arrows around date to allow easier movement from one day to another

search functionality

custom text input for duration timer: only num validation

create different views - weekly & monthly

add in calendar interactions ie: if there is an event on said day

fix add event styling/ create labels for event target date and event target time

fix search spacing while add event is open

fix design spacing

refactor css (set a standard for rem units)

make responsive- add media queries/ breakpoints - pay attention to font size for different areas, especially text heavy areas

change from 15 min intervals to hours and convert grid to 24 hours with 60 rows per hour

move sign-in/ sign-out to a more obvious place

add [cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements) and [code coverage](https://vuejsdevelopers.com/2020/07/20/code-coverage-vue-cypress/)

~~display multiple events over lapping on the same time slots - ideas: cards/ google calendar/ ect~~

~~decide on how to display multiple to-do items~~

~~current time ticker- don't remember what this is~~

~~fix displaying of to list items that exceed 24 hours~~

~~add a mark on the calendar for selected/view date vs current Date~~

---

### BUG

issue with signing out and signing back in, user_id persists to next database call, meaning it queries the previous user_id

issue with clicking on date and it showing up for subsequent months

today not marking correctly

~~Fix Calendar!!! 2 is missing due to sharing the same constraints as today~~

~~fix duration display: days/hrs/mins vs day/hr/min~~

~~when opening calendar, resets date~~
