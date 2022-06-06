class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = [];

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getTasks() {
    return this.tasks;
  }

  public sortTasks() {
    this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
  }

  public getIterator() {
    return new PriorityTaskIterator(this);
  }
}

interface IIterator<T> {
  curr(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

class PriorityTaskIterator implements IIterator<Task> {
  private position: number = 0;
  private taskList: TaskList;
  
  constructor(taskList: TaskList) {
    taskList.sortTasks();
    this.taskList = taskList;
  }
  
  curr(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  next(): Task | undefined {
    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }

  prev(): Task | undefined {
    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }

  index(): number {
    return this.position;
  }
}

const taskList = new TaskList();
taskList.addTask(new Task(8));
taskList.addTask(new Task(1));
taskList.addTask(new Task(3));

const iterator = taskList.getIterator();

console.log(iterator.curr());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());