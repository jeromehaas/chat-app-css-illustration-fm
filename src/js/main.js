import messages from '../database/messages.json';

class ChatApp {

  constructor() {
    this.messages = [];
    this.elements = {
      messageContainer: document.querySelector('.phone__messages'),
      contactTypingStatusLabel: document.querySelector('.contact__status')
    }
    this.contact = {
      isAvailable: true,
      isTyping: false
    }
  }

  init() {
    this.createMessages(messages);
    this.appendMessage(this.messages[0], 1000, 1000);
    this.appendMessage(this.messages[1], 3000, 1000);
    this.appendMessage(this.messages[2], 5000, 1000);
    this.appendMessage(this.messages[3], 7000, 1000);
    this.appendMessage(this.messages[4], 9000, 1000);
    this.appendMessage(this.messages[5], 11000, 1000);
    this.appendMessage(this.messages[6], 13000, 1000);
    this.appendMessage(this.messages[7], 13000, 1000);
  }

  setContactTypingStatus(status) {
    this.contact.isTyping = status === 'typing' ? true : false;
    this.printContactTypingStatus();
  }

  printContactTypingStatus() {
    if (this.contact.isTyping) {
      this.elements.contactTypingStatusLabel.innerText = 'typing...'
    } else if (this.contact.isAvailable) {
      this.elements.contactTypingStatusLabel.innerText = 'Available to Walk'
    } else {
      this.elements.contactTypingStatusLabel.innerText = 'Currently not available'
    }
  }


  appendMessage(message, start, timeout = 3000) {
    if (!message) return;
    setTimeout(() => {
      if (message.classList.contains('message--left')) this.setContactTypingStatus('typing');
      setTimeout(() => {
        this.elements.messageContainer.appendChild(message);
        this.setContactTypingStatus();
        this.messageIndex++;
        this.elements.messageContainer.scrollTop = this.elements.messageContainer.scrollHeight;
      }, timeout)
    }, start)
  }

  createMessages(messages) {
    messages.map((message) => {
      switch (message.type) {
        case 'text': {
          const messageDiv = document.createElement('div');
          const messageParagraph = document.createElement('p');
          messageDiv.classList.add('phone__message', 'message', 'phone__message--text', `message--${message.position}`, `message--${message.color}`);
          messageParagraph.classList.add('text__text');
          messageParagraph.innerText = message.content.text;
          messageDiv.appendChild(messageParagraph);
          this.messages.push(messageDiv);
          break;
        }
        case 'media': {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('phone__message', 'phone__message--media', 'media', 'message', `message--${message.position}`);
          message.images.map((path) => {
            const image = document.createElement('img');
            image.src = path;
            messageDiv.appendChild(image);
          });
          this.messages.push(messageDiv);
          break;
        }
        case 'offer': {
          const messageDiv = document.createElement('div');
          const messageCheckbox = document.createElement('div');
          const messageIcon = document.createElement('i');
          const messageText = document.createElement('p');
          const messagePrice = document.createElement('p');
          messageDiv.classList.add('phone__message', 'message', 'phone__message--offer', `message--${message.position}`, `message--${message.color}`);
          messageCheckbox.classList.add('offer__checkbox', 'checkbox');
          messageIcon.classList.add('checkbox__icon', 'icon', 'icon--sm', 'icon--white', 'icon-checkmark');
          messageText.classList.add('offer__text');
          messageText.innerText = message.content.text;
          messagePrice.classList.add('offer__price');
          messagePrice.innerText = message.content.price;
          messageCheckbox.appendChild(messageIcon);
          messageDiv.appendChild(messageCheckbox);
          messageDiv.appendChild(messageText);
          messageDiv.appendChild(messagePrice);
          messageDiv.addEventListener('click', (event) => this.chooseOffer(event.target));
          this.messages.push(messageDiv);
          break;
        };
      };
    });
  };

  chooseOffer(element) {
    const checkboxes = document.querySelectorAll('.offer__checkbox');
    checkboxes.forEach((item) => item.classList.remove('checkbox--checked'));
    const message = element.closest('.phone__message');
    const checkbox = message.querySelector('.offer__checkbox');
    checkbox.classList.add('checkbox--checked');
  };

};

const chatApp = new ChatApp();
chatApp.init();