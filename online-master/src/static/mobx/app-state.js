import {
  observable,
  // computed,
  // autorun,
  action,
  toJson,
} from 'mobx'
import { runInThisContext } from 'vm';

class AppState {
  @observable code // 代码
  @observable syncing // 正在加载
  @observable xmlFile // 打开xml文件

//   @observable questionnaire={
//       name: [],
//       url: [],
//       id: [],
//   } // 管理员分发的问卷对象
//   @observable teacher={
//       name: [],
//       id: [],
//   } // 管理员分发问卷的教师对象

  @observable questionnaire=[]
  @observable teacher=[]

  constructor({
    code = 'print(u"欢迎光临YaK编程世界！")',
    syncing = false,
    xmlFile = '',
    questionnaire = [],
    teacher = [],
  } = {}) { // 构造方法给默认值
    this.code = code
    this.syncing = syncing
    this.xmlFile = xmlFile
    this.questionnaire = questionnaire
    this.teacher = teacher
  }

  // @computed get getCode() {
  //   return this.code
  // }

  @action changeCode(code) { // 实时变动代码
    this.code = code
  }

  @action changeXMLFile(xmlFile) { // 实时变动xmlFile
    this.xmlFile = xmlFile
  }


  @action selectQuestionnaire(Object) { // 管理员选择的问卷
    // this.questionnaire.name = Object.name
    // this.questionnaire.url = Object.url
    // this.questionnaire.id = Object.id
    this.questionnaire = Object
  }

  @action selectTeacher(Object) { // 管理选择的教师
    //   this.teacher.name = Object.name
    //   this.teacher.id = Object.id
    this.teacher = Object
  }

  toJson() {
      return {
          questionnaire: toJson(this.questionnaire),
          teacher: toJson(this.teacher),
      }
  }
}

const appState = new AppState()

export default appState

// 搜索
// const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

// /**
//  * Array filters items based on search criteria (query)
//  */
// const filterItems = (query) => {
//   return fruits.filter((el) =>
//     el.toLowerCase().indexOf(query.toLowerCase()) > -1
//   );
// }

// console.log(filterItems('ap')); // ['apple', 'grapes']
// console.log(filterItems('an')); // ['banana', 'mango', 'orange']



