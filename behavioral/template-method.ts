class Form {
  constructor(public name: string) {}
}

abstract class SaveForm<T> {
  public save(form: Form): void {
    const res = this.fill(form);
    this.log(res);
    this.send(res);
  }

  protected abstract fill(form: Form): T;

  protected log(data: T): void {
    console.log(data);
  }

  protected abstract send(data: T): void;
}

class FirstAPIForm extends SaveForm<string> {
  fill(form: Form): string {
    return form.name;
  }

  send(data: string): void {
    console.log(`Send ${data}`);
  }
}

class SecondAPIForm extends SaveForm<{ fio: string }> {
  fill(form: Form): { fio: string; } {
    return { fio: form.name };
  }

  send(data: { fio: string; }): void {
    console.log(`Send fio data: ${data}`);
  }
}

const form1 = new FirstAPIForm();
form1.save(new Form('Test'));

const form2 = new SecondAPIForm();
form2.save(new Form('Test'));