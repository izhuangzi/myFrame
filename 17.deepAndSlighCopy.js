/*//浅拷贝
//1、JS对象浅拷贝
let arr = [5,6,7,8];
let obj = {name:'tom',age:8};
let arr1 = arr;
let obj1 = obj;

console.log(arr);//[5,6,7,8]
console.log(arr1);//[5,6,7,8]
console.log(obj);//{name:'tom',age:8}
console.log(obj1);//{name:'tom',age:8}
//=====================================

arr1[3]=0;
obj1.age=16;
console.log(arr);//[5,6,7,0]
console.log(arr1);//[5,6,7,0]
console.log(obj);//{name:'tom',age:16}
console.log(obj1);//{name:'tom',age:16}
//总结：浅拷贝是对对象地址的拷贝，但是这时候，两个对象共用一个地址，没有另开新栈，所以修改一个对象里的属性，另一个对象的属性也会被修改。*/

//深拷贝
//2、JS对象深拷贝
//(1)、数组的深拷贝（一维数组）
/*let arr = [4,5,6,7];
let deepArr = [];

function deepCopy(arr1,arr2) {//arr1为拷贝前的，arr2为拷贝后的
    for (let i = 0; i < arr1.length; i++) {
        arr2[i] = arr1[i];
    }
    return arr2;
}

deepCopy(arr,deepArr);
console.log(arr);//[4,5,6,7]
console.log(deepArr);//[4,5,6,7]
//==============================
deepArr[3]=0;
console.log(arr);//[4,5,6,7]
console.log(deepArr);//[4,5,6,0]
//总结：此时数组进行的是深拷贝，拷贝后的数组有一个新的栈，所以修改拷贝后的属性值，拷贝前的属性值不会改变。*/


//=============================================================================================================

/*//（1-1）、多维数组深拷贝
let ary = [1,[9,5,7],0,3];
let deepAry = [];
function deepCopy(arr1,arr2) {//arr1为拷贝前的，arr2为拷贝后的
    for (let i = 0; i < arr1.length; i++) {
        arr2[i] = arr1[i];
    }
    return arr2;
}
//易错点：此deepCopy函数只能实现一维数组的深拷贝，多维数组不能满足要求(二维度以上无法实现深拷贝)。所以deepCopy函数不能完成多维数组的深拷贝。
deepCopy(ary,deepAry);
console.log(ary);//[ 1, [ 9, 5, 7 ], 0, 3 ]
console.log(deepAry);//[ 1, [ 9, 5, 7 ], 0, 3 ]
//===============================
deepAry[1][1]=0;
console.log(ary);//[ 1, [ 9, 0, 7 ], 0, 3 ]
console.log(deepAry);//[ 1, [ 9, 0, 7 ], 0, 3 ]
deepAry[0]=0;
console.log(ary);//[ 1, [ 9, 0, 7 ], 0, 3 ]*/

//=============================================================================================================

/*//(1-2)、多维数组深拷贝之另法-使用递归解决
function deepCopy(ary1,ary2) {//此方法最多拷贝三维数组，四维及以上数组不生效
    let tempAry = [];
    for (let i = 0; i < ary1.length; i++) {
        if(ary1[i] instanceof Array){
            deepCopy(ary1[i],tempAry);
            ary2[i]=tempAry;
        }else{
            ary2[i]=ary1[i];
        }
    }
    return ary2;
}

let b=[1,[2,3],4,5];
let c=[1,[2,[3,4],5],6];
let d = [1,[2,3,4],7,[8,9,5]];
/!*let deepAry=[];
deepCopy(b,deepAry);
console.log(b);//[ 1, [ 2, 3 ], 4, 5 ]
console.log(deepAry);//[ 1, [ 2, 3 ], 4, 5 ]
deepAry[1][1]=0;
console.log(b);//[ 1, [ 2, 3 ], 4, 5 ]
console.log(deepAry);//[ 1, [ 2, 0 ], 4, 5 ]*!/
//===============================================
/!*let deepAry=[];
deepCopy(c,deepAry);
console.log(c);//[ 1, [ 2, [ 3, 4 ], 5 ], 6 ]
console.log(deepAry);//[ 1, [ 2, [ 3, 4 ], 5 ], 6 ]
deepAry[1][1][1]=0;
console.log(c);//[ 1, [ 2, [ 3, 4 ], 5 ], 6 ]
console.log(deepAry);//[ 1, [ 2, [ 3, 0 ], 5 ], 6 ]*!/
//===================================================
let deepAry = [];
deepCopy(d,deepAry);
console.log(d);//[ 1, [ 2, 3, 4 ], 7, [ 8, 9, 5 ] ]
console.log(deepAry);//[ 1, [ 2, 3, 4 ], 7, [ 8, 9, 5 ] ]
deepAry[1][2]=0;
console.log(d);//[ 1, [ 2, 3, 4 ], 7, [ 8, 9, 5 ] ]
console.log(deepAry);//[ 1, [ 8, 9, 0 ], 7, [ 8, 9, 0 ] ]*/
//=================================================================================================

//（2）、对象的深拷贝
/*
function Test() {
    this.name='xiaohong';
    this.age=18;
    this.run=function () {
        console.log('run');
    }
}
let test = new Test();
console.log(test.name);
test.run();

function ChildrenTest() {
    this.name='xiaogang';
    this.age=15;
    this.sing=function () {
        console.log('sing');
    }
}
ChildrenTest.prototype = new Test();
let children = new ChildrenTest();
console.log(children.name);//xiaogang
children.sing();//sing
console.log(children);//{name:'xiaogang',age:15,sing:f,run:f}
//===========================================================
children.name='xiaoxiao';
console.log(test);//{name:'xiaohong',age:15,run:f}
children.run=function () {
    console.log('smile');
};
test.run();//run
children.run();//smile

//===========================================================
//用for in 遍历一个对象属性的时候，也会查找到原型链上的属性。（过滤原型链上的属性，可以使用hasOwnProperty）
for(let key in children){
    //console.log(key);//name age sing run
    if(children.hasOwnProperty(key)){
        console.log(key);//name age sing
    }
}
*/
//=======================================================================================================

/*//（2-2）、完整的克隆一个对象的方法
//叙用上面写的children的方法
function Test() {
    this.name='xiaohong';
    this.age=18;
    this.run=function () {
        console.log('run');
    }
}
function ChildrenTest() {
    this.name='xiaogang';
    this.age=15;
    this.sing=function () {
        console.log('sing');
    }
}
ChildrenTest.prototype = new Test();
let children = new ChildrenTest();
let cloneObj = {};
for(let key in children){
    if(children.hasOwnProperty(key)){
        cloneObj[key]=children[key];
    }
}
console.log(cloneObj);//__protp__指向为Object*/

//==========================================================================================================

/*//(3)、用js方法深拷贝一维数组
//(3-1)、用slice函数
/!*let a=[1,2,3,4];
let b=[];
b=a.slice(0);
b[3]=0;
console.log(a);//[ 1, 2, 3, 4 ]
console.log(b);//[ 1, 2, 3, 0 ]*!/

//（3-2）、使用concat
let a =[1,2,3,4];
let b=[];
b=a.concat([]);
console.log(b);//[ 1, 2, 3, 4 ]
b[3]=0;
console.log(a);//[ 1, 2, 3, 4 ]
console.log(b);//[ 1, 2, 3, 0 ]*/

//=====================================================================================================

//二、jQuery中对数组的克隆
/*jQuery.extend([deep,target,object1[,objectN...]]);
请根据前面语法部分所定义的参数名称查找对应的参数。

参数描述
deep 可选/Boolean类型 指示是否深度合并对象，默认为false。如果该值为true，且多个对象的某个同名属性也都是对象，则该”属性对象”的属性也将进行合并。
target Object类型目标对象，其他对象的成员属性将被复制到该对象上。 object1 可选/Object类型第一个被合并的对象。
objectN 可选/Object类型第N个被合并的对象。*/

/*
var a = { k1: 1, k2: 2, k3: 3 };
var b = {k4:4, k5:5};
var c ;
c=$.extend(a);           //将a对象复制到jquery对象上，并赋值给c
console.log('------------');
console.log(c === $);    //c对象指向的是$对象,所以结果true
console.log(a === $);   // false
console.log('------c------');
console.log(c.k2);  //2     //相当于$.k2
console.log('------c------');
console.log(c);//function(selector,context){return new jQuery.fn.init(selector,context);}
//c.k2 = 777;
console.log('------a------');
console.log(a);//Object{k1:1,k2:2,k3:3}
console.log('------b------');
console.log(b);//Object{k4:4,k5:5}
console.log('------$------');
console.log($);//function(selector,context){return new jQuery.fn.init(selector,context);}
console.log($.k2);//2
*/

//===================================================================================
/*var d = $.extend({}, a);
console.log(d);//Object{k1:1,k2:2,k3:3}
d.k2 = 3456;
console.log(d);//Object{k1:1,k2:3456,k3:3}
console.log(a);//Object{k1:1,k2:2,k3:3}*/

//====================================================================================
/*可以知道,jquery中extend()不是复制引用，而是创建了新的对象

注意事项：
该函数复制的对象属性包括方法在内。此外，还会复制对象继承自原型中的属性(JS内置的对象除外)。
参数deep的默认值为false，你可以为该参数明确指定true值，但不能明确指定false值。简而言之，第一个参数不能为false值。
如果参数为null或undefined，则该参数将被忽略。
如果只为$.extend()指定了一个参数，则意味着参数target被省略。此时，target就是jQuery对象本身。通过这种方式，我们可以为全局对象jQuery添加新的函数。
如果多个对象具有相同的属性，则后者会覆盖前者的属性值。
*/
//===================================================================================
//看下面一段代码对数组对象进行拷贝：
/*var test = [1,2,34,];
console.log(test);//[1,2,34,]
var contest= $.extend([],test);
console.log(contest);//[1,2,34,]
contest.push(567);
console.log(test);//[1,2,34,]
console.log(contest);//[1,2,34,567]*/





























