import "./slider";
import Modal from "./modules/modal.component";
import Tabs from "./modules/tabs.component";
import Timer from "./modules/timer.component";



document.addEventListener('DOMContentLoaded', () => {
    const popupEng = new Modal('.popup_engineer', '.popup_engineer_btn').init();

    const popup = new Modal('.popup', '.phone_link');
    popup.modalDelegation({useButtonsClass: true});
    popup.showWithDelay(60000);

    const popupCalc = new Modal('.popup_calc', '.popup_calc_btn');
    popupCalc.modalDelegation({useWrapperDelegationSel: '.glazing'});

    const glazingTabs = new Tabs('.glazing', '.glazing_slider', '.glazing_block', '.glazing', '.glazing_content' , 'active', 'a').init();

    const decorationTabs = new Tabs('.decoration', '.decoration_slider', '.decoration_item', '.decoration_content .row', 'div', 'after_click', 'div').init();

    const timer = new Timer('2020-08-15', '#timer', '#days', '#hours', '#minutes', '#seconds').init();
});