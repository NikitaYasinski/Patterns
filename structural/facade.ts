class Notifier {
  public send(template: string, to: string): void {
      console.log(`Sending ${template}: ${to}`);
  }
}

class Logger {
  public log(message: string): void {
      console.log(message);
  }
}

interface ITemplate {
  name: string;
  data: string
}

class Template {
  private templates: ITemplate[] = [
      { name: 'other', data: '<h1>Template!</h1>'}
  ];

  public getTemplateByName(name: string): ITemplate | undefined {
      return this.templates.find(t => t.name === name);
  }
}

class NotifierFacade {
  private notifier: Notifier;
  private logger: Logger;
  private template: Template;

  constructor() {
      this.notifier = new Notifier();
      this.logger = new Logger();
      this.template = new Template();
  }

  public send(templateName: string, to: string): void {
      const template = this.template.getTemplateByName(templateName);
      if (!template) {
          this.logger.log('No such template');
          return;
      }

      this.notifier.send(template.data, to);
      this.logger.log('Successfully send template');
  }
}

const s = new NotifierFacade();
s.send('other', 'a@a.com')