interface IObserver {
  update(subject: ISubject): void;
}

interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

class Lead {
  constructor(private name: string, private phone: string) {}
}

class NewLead implements ISubject {
  private observers: IObserver[] = [];
  
  constructor(private state: Lead) {}
  
  attach(observer: IObserver): void {
    if (this.observers.includes(observer)) {
      return;
    }
    this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex === -1) {
      return;
    }

    this.observers.splice(observerIndex, 1);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

class LeadService implements IObserver {
  update(subject: ISubject): void {
    console.log('LeadService event');
    console.log(subject);
  }
}

class NotificationsService implements IObserver {
  update(subject: ISubject): void {
    console.log('NotificationsService event');
    console.log(subject);
  }
}

const subject = new NewLead(new Lead('Vasya', '1111'));

const obs1 = new LeadService();
const obs2 = new NotificationsService();

subject.attach(obs1);
subject.attach(obs2);
subject.notify();
subject.detach(obs1);
subject.notify();
