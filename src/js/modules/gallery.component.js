import Modal from './modal.component';

export default class Gallery {
    constructor(section) {
        this.section = document.querySelector(section);
    }

    init(options) {
        this.section.insertAdjacentHTML('beforeend', _createModalImg( _checkArray(options.classModal) ? options.classModal.join(' ') : options.classModal, options.classImgInModal));
        this.modalImg = this.section.querySelector( _addPoint(options.classImgInModal) );

        const galleryModal = new Modal( _checkArray(options.classModal) ? _addPoint(options.classModal[options.uniqueClassIndInArray]) : _addPoint(options.classModal), _addPoint(options.classTargetImg), options.modalShowClass);
        galleryModal.modalDelegation({useWrapperDelegationSel: _addPoint.call(this, this.section.className)});


        this.section.addEventListener('click', _galleryClickHandler.bind(this, options));
    }
}

function _createModalImg(classModal, classImg) {
    return  `
        <div class="${classModal}">
            <img src="assets/img/our_works/1.png" class="${classImg}" style="margin-bottom:0 !important"alt="img">
        </div>
    `
};

function _addPoint(arg) {
    return '.' + arg;
}

function _checkArray(array) {
    return array.length > 1 && typeof array === 'object' ? true : false
}

function _galleryClickHandler(options, e) {
    const target = e.target;

    if(target && target.classList.contains(options.classTargetImg)) {
       const href = target.parentElement.getAttribute('href');
       this.modalImg.setAttribute('src', href);
    }
}