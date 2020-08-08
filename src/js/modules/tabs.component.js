export default class Tabs {
    constructor(section, parentTab, tab, parentTabContent, tabContent, activeClass, activeElement) {
        this.section = document.querySelector(section);
        this.parentTab = this.section.querySelector(parentTab);
        this.tab = tab
        this.parentTabContent = section !== parentTabContent ? this.section.querySelector(parentTabContent) : this.section;
        this.tabContent = tabContent;
        this.activeClass = activeClass;
        this.activeElement = activeElement;
    }

    init() {
        this.parentTab.addEventListener('click', _tabClickHandler.bind(this));
    }
   

}

function _tabClickHandler(e) {
    const target = e.target.closest(this.tab);
    const link = target.querySelector(this.activeElement);
    if(target && target.classList.contains(this.tab.slice(1))) {
        const postion = link.className.match(/_/).index;
        const tabContentName = link.className.slice(0, postion);

        _hideClassActiveFromTab.call(this, this.parentTab);

        _addClassActiveToTab.call(this, link);

        _hideAllTabContent.call(this, this.parentTabContent);

        _showTabContent.call(this, _searchTabContent.call(this, tabContentName));
    }
}

function _addClassActiveToTab(tab) {
    tab.classList.add(this.activeClass);
}

function _hideClassActiveFromTab(parentTab) {
   _deleteClassActiveFromTab.call(this,  parentTab.querySelector('.' + this.activeClass))
}

function _deleteClassActiveFromTab(tab) {
    tab.classList.remove(this.activeClass);
}


function _showTabContent(tab) {
    tab.classList.add('show');
}

function _searchTabContent(tabName) {
    return this.parentTabContent.querySelector('.' + tabName);
}

function _hideTabContent(tab) {
    console.log(tab);
    tab.classList.remove('show');
}

function _hideAllTabContent(parentTab) {
    _hideTabContent(parentTab.querySelector('.show'));       
}
