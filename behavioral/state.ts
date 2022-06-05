class DocumentItem {
  public text: string;
  private state: DocumentItemState;

  constructor(text: string) {
    this.text = text;
    this.setState(new DraftedDocumentItemState());
  }

  public getState() {
    return this.state;
  }

  public setState(state: DocumentItemState) {
    this.state = state;
    this.state.setContext(this);
  }

  public publishDoc() {
    this.state.publish();
  }

  public deleteDoc() {
    this.state.delete();
  }
}

abstract class DocumentItemState {
  protected name: string;
  protected item: DocumentItem;

  public setContext(item: DocumentItem) {
    this.item = item;
  }

  public abstract publish(): void;
  public abstract delete(): void;
}

class DraftedDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'DraftedDocument';
  }
  
  public publish(): void {
    console.log(`Publish document with text ${this.item.text}`);
    this.item.setState(new PublishedDocumentItemState());
  }

  public delete(): void {
    console.log('Already deleted');
  }
}

class PublishedDocumentItemState extends DocumentItemState {
  constructor() {
    super();
    this.name = 'PublishedDocument';
  }
  
  public publish(): void {
    console.log('Already published');
  }

  public delete(): void {
    console.log(`Delete item with text ${this.item.text}`);
    this.item.setState(new DraftedDocumentItemState());
  }
}

const item = new DocumentItem('Test document');
console.log(item.getState());
item.publishDoc();
console.log(item.getState());
item.deleteDoc();
console.log(item.getState());