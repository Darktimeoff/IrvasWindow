import "./slider";
import Modal from "./modules/modal.component";
import Tabs from "./modules/tabs.component";
import Timer from "./modules/timer.component";
import Gallery from "./modules/gallery.component";
import Form from './modules/form.component';
import Validators from "./modules/validators.component";
import RequestService from "./services/request.services";



document.addEventListener('DOMContentLoaded', () => {
    const popupEng = new Modal('.popup_engineer', '.popup_engineer_btn').init();

    const popup = new Modal('.popup', '.phone_link');
    popup.modalDelegation({useButtonsClass: true});
    //popup.showWithDelay(1000);

    const popupCalc = new Modal('.popup_calc', '.popup_calc_btn');
    popupCalc.modalDelegation({useWrapperDelegationSel: '.glazing'});
    popupCalc.onShow = function () {
       
    }

    const glazingTabs = new Tabs('.glazing', '.glazing_slider', '.glazing_block', '.glazing', '.glazing_content' , 'active', 'a').init();

    const decorationTabs = new Tabs('.decoration', '.decoration_slider', '.decoration_item', '.decoration_content .row', 'div', 'after_click', 'div').init();

    const timer = new Timer('2020-08-15', '#timer', '#days', '#hours', '#minutes', '#seconds').init();

    const gallery = new Gallery('.works').init({
        classModal:  ['popup', 'modal-gallery'],
        classImgInModal: 'modal-prev-img',
        modalShowClass: 'show-flex',
        classTargetImg: 'preview',
        uniqueClassIndInArray: 1
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', _formSubmitHandler);
    })

    async function _formSubmitHandler(e) {
        e.preventDefault();
        const form = new Form(e.target, {
            user_name:[Validators.required],
            user_phone:[Validators.required, Validators.minLength(8)]
        });
        if(form.isValid()) {
            const data =  {...form.value()};
            RequestService.postRequest(data, 'assets/server.php')
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                    console.log(e);
            })
            
            form.clear();
        }
    }
});