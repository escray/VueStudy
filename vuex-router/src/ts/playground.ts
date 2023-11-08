let courseName:string = 'Play with Vue 3 Family'
let price:number = 120
// price = '89'
let isOnline:boolean = true
let courseSales:undefined
let timer:null = null
let me:[string, number] = ["DaSheng",18]
// me[0] = 1

let anyThing
let anyCourse :any = 1
anyCourse = 'xx'
// console.log(anyCourse.a.b.c)
// 建议你每行代码都都敲一遍

enum courseRate {good, better, best}
console.log(courseRate['good'] === 0)
console.log(courseRate[0] === 'good')
let scores = [courseRate['good'], courseRate['better'], courseRate['best']]

let course1 : string|number = 'play with vue 3'
course1 = 1
// course1 = true

type courseScore = 'good' | 'better' | 'best'
let score1 :courseScore = 'good'
// let score2 :courseScore = 'very good'

interface GeekTimeCourse {
    CourseName:string,
    Price:number[],
    Customer:string,
    TeacherIcon:string|boolean,
    readonly CourseURL:string
}
let vueCourse:GeekTimeCourse = {
    CourseName:'play with Vue 3 Family',
    Price: [59, 139],
    Customer: 'everyone',
    TeacherIcon:false,
    CourseURL:'time.geekbang.org'
}
// vueCourse.CourseURL="e3.shengxinjing.cn"

function add(x: number, y: number): number {
    return x + y;
}
add(1, 2);

let add1:(a:number, b:number) => number = function(x:number, y:number): number {
    return x + y;
}

type addType = (a:number, b:number) => number

let add2:addType = function(x: number, y: number): number {
    return x + y;
}

interface addType1 {
    (a:number, b:number):number
}

let add3:addType1 = function(x:number, y:number): number {
    return x + y;
}

// 重载
function reverse(x: number):number
function reverse(x: string):string
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

let w:Window = window
let ele:HTMLElement = document.createElement('div')
let allDiv:NodeList = document.querySelectorAll('div')
ele.addEventListener('click', function(e:MouseEvent){
    const args:IArguments = arguments
    w.alert(1)
    console.log(args)
}, false)

import { ref, Ref } from 'vue'
interface Todo {
    title:string,
    done:boolean
}
let todos:Ref = ref([{title: 'study Vue', done:false}])

// 泛型
function identity0(arg: any):any {
    return arg
}

function identity<T>(arg: T):T {
    return arg
}

identity<string>('playwith vue3 family')
identity<number>(1)

interface VueCourse5 {
    name:string,
    price:number
}
type CourseProps = keyof VueCourse5
let k:CourseProps = 'name'
let p:CourseProps = 'p'

type ExtendsType<T> = T extends boolean ? "ReStudy FrontEnd" : "play with Vue 3"
type ExtendsType1 = ExtendsType<boolean> // type ExtendType1='ReStudy FrontEnd"
type ExtendsType2 = ExtendsType<string>  // type ExtendType2='play with Vue 3"

type Courses = 'play with Vue 3'|'ReStudy FrontEnd'
type CourseObj = {
    [k in Courses]:number
}
// 上面的代码等于下面的定义
// type CourseObj = {
//     'play with Vue 3': number;
//     'ReStudy FrontEnd': number;
// }

// K extends keyof T限制K的类型必须是T的属性之一
// T[K]是值得类型
function getProperty<T, K extends keyof T>(o:T, name:K): T[K]{
    return o[name]
}
const coursePrice:CourseObj = {
    'play with Vue 3': 129,
    'ReStudy FrontEnd': 199
}

getProperty(coursePrice, 'play with Vue 3')
// getProperty(coursePrice, 'Study FrontEnd') // ERROR

type Foo = () => CourseObj
// 如果T是一个函数，并且函数返回类型是P就返回P
type ReturnType1<T> = T extends () => infer P ? P:never
type Foo1 = ReturnType1<Foo>

interface Todo {
    title: string
    desc: string
    done: boolean
}

type Partial1<T> = {
  [K in keyof T]?:T[K]
}

import axios from 'axios'


interface Api{
  '/course/buy': {
    id:number
  },
  '/course/comment': {
    id: number,
    message:string
  }
}
// function request(url: string, obj: any) {
//   return axios.post(url, obj)
// }
function request<T extends keyof Api>(url: T, obj: Api[T]) {
  return axios.post(url, obj)
}

request('/course/buy', { id: 1 })
request('/course/comment', { id: 1, message: "beautiful" })
request('/course/comment', { id: 1 })
request('/course/404', {id: 1})
