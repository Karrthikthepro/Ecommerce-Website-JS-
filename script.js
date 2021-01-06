//Variable
const cart=document.getElementById("cart");
const courses=document.getElementById("course-card-container");
const emptybtn=document.getElementById("empty");
const listCourses=document.querySelector("#list-cart")

//Listners
loadEventListeners();
function loadEventListeners(){
    //When add cart is pressed
    courses.addEventListener('click', buyCourse);
    //When a course is removed from the cart
    cart.addEventListener('click', deleteCourse);
    //When empty cart btn pressed
    emptybtn.addEventListener('click', emptyCart);
    //While loading the document,show local storage//
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

//Functions
//Function that adds the course to cart
function buyCourse(e){
    e.preventDefault();
    if(e.target.classList.contains("btn")){
        const course=e.target.parentElement.parentElement;
        readDataCourse(course);
    }
}

//Function that reads the course data
function readDataCourse(course){
    const infoCourse={
        image: course.querySelector('img').src,
        name: course.querySelector('.name').textContent,
        price:course.querySelector('.price').textContent,
        id:course.querySelector("button").getAttribute('data-id')
    }
    insertInCart(infoCourse);
}
//Insert selected course in cart
function insertInCart(course){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${course.image}" width=100px>
        </td>
        <td>
            ${course.name}
        </td>
        <td>
            ${course.price}
        </td>
        <td>
            <a class="delete-course" data-id="${course.id}" href="#">X</a>
        </td>
    `;
    listCourses.appendChild(row);
    saveCourseLocalStorage(course);
}
//Remove the course from cart
function deleteCourse(e){
    e.preventDefault();
    let course,
    courseId;
    if(e.target.classList.contains("delete-course")){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId=course.querySelector("a").getAttribute("data-id");
    }
    deleteCourseLocalStorage(courseId);
}
//Remove all courses from cart
function emptyCart(){
    while(listCourses.firstChild){
        listCourses.removeChild(listCourses.firstChild);
    }
    //empty local storage
    emptyLocalStorage();
    return false;
}
//This function stores courses in the local storage in the browser
function saveCourseLocalStorage(course){
    let courses;
//Take the vlaue of an array with local storage or empty data
    courses = getCoursesLocalStorage();
//Selected course is added to the array
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses));
}
//Check for items in local storage
function getCoursesLocalStorage(){
    let coursesLS;
//Check if somthing is there in the local storage
    if(localStorage.getItem('courses')===null){
        coursesLS = [];
    }
    else{
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}
//Read local storage
function readLocalStorage(){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(
        function(course){
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <img src="${course.image}" width=100px>
            </td>
            <td>
                ${course.name}
            </td>
            <td>
                ${course.price}
            </td>
            <td>
                <a class="delete-course" data-id="${course.id}" href="#">X</a>
            </td>
            `;
            listCourses.appendChild(row);
        }
    );
}
//Deletes the course
function deleteCourseLocalStorage(course){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
//Comparing the delete course id with those of the LS
    coursesLS.forEach(
        function(coursesLS,index){
            if(coursesLS.id===course){
                coursesLS.splice(index,1);
            }
        }
    );
    localStorage.setItem('courses',JSON.stringify(coursesLS));
}
//Deletes all courses from local storage
function emptyLocalStorage(){
    localStorage.clear();
    
}