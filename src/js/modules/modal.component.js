export default class Modal {
    constructor(modalSel, buttonOpenSel, classShow='show') {
       try{
			this.modal = document.querySelector(modalSel);
			this.buttonOpenSel = buttonOpenSel;
			this.modalSel = modalSel;
			this.buttonOpen = document.querySelector(buttonOpenSel)
			this.modalClose = this.modal.querySelector('[data-close]');
			this.classShow = classShow;
 	   } catch(e) {
			throw new Error("variables doesn't found");
	   }
    }

	modalDelegation(options) {
		if(options.useButtonsClass) {
			this.buttonOpen = document.querySelectorAll(this.buttonOpenSel);
			this.init();
		}

		if(options.useWrapperDelegationSel) {
			document.querySelector(options.useWrapperDelegationSel).addEventListener('click', _wrapperDelHandler.bind(this));
		}
	}

    init() {
		if(this.buttonOpen instanceof NodeList) {
			this.buttonOpen.forEach(button => {
				button.addEventListener('click', _buttonHandler.bind(this));
			});
		} else {
			this.buttonOpen.addEventListener('click', _buttonHandler.bind(this));
		}
    }

    show() {
		this.modal.classList.add(this.classShow);
		document.body.style.overflow = 'hidden';
		this.onShow();
    }

    hide() {
		this.modal.classList.remove(this.classShow);
		document.body.style.overflow = '';
		this.onHide();
	}
	
	destroy() {
		this.onDestroy();
	}


	showWithDelay(delay) {
		setTimeout(() => {this.emulatedClick()}, delay);
	}

	emulatedClick() {
		typeof this.buttonOpen === 'object' ? this.buttonOpen[0].click() : this.buttonOpen.click();
	}

	onShow() {}

	onHide() {}

	onDestroy() {}
}


function _buttonHandler(event) {
	event.preventDefault();
	this.show();
	this.modal.addEventListener('click', _modalHandler.bind(this), {once: true});
}

function _modalHandler(event) {
	_modalClose.call(this, event);
}

function _modalClose(event) {
	const target = event.target;
	if(target && (target.closest('[data-close]') === this.modalClose)) {
		this.hide();
	}

	if(target && (target === this.modal)) {
		this.hide();
	}
}

function _wrapperDelHandler(e) {
	if(e.target && e.target.classList.contains(this.buttonOpenSel.slice(1))) {
		_buttonHandler.call(this, e);
	}
}