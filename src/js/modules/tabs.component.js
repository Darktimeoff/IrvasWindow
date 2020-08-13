export default class Tabs {
    constructor(section, parentTab, tab, parentTabContent, tabContent, activeClass, activeElement, nameClassTabAndContentSame = true, activeTabContentClass = 'show') {
        this.section = document.querySelector(section);
        this.parentTab = this.section.querySelector(parentTab);
        this.tab = tab
        this.parentTabContent = section !== parentTabContent ? this.section.querySelector(parentTabContent) : this.section;
        this.tabContent = tabContent;
        this.activeClass = activeClass;
        this.activeElement = activeElement !== tab ? activeElement : parentTab;
        this.nameClassTabAndContentSame = nameClassTabAndContentSame;
        this.activeTabContentClass = activeTabContentClass;
    }

    init() {
        this.parentTab.addEventListener('click', _tabClickHandler.bind(this));
    }
   

}

function _tabClickHandler(e) {
    const target = e.target.closest(this.tab);
    const link = target.querySelector(this.activeElement);
    if(this.nameClassTabAndContentSame && target && target.classList.contains(this.tab.slice(1))) {
        const postion = link.className.match(/_/).index;
        const tabContentName = link.className.slice(0, postion);

        _tab.call(this, this.parentTab, this.parentTabContent, this.activeClass, this.activeTabContentClass, link, _searchTabContent.call(this, tabContentName));

    }

    if(!this.nameClassTabAndContentSame && e.target.closest(this.activeElement)) {
        const tab = e.target.closest(this.activeElement);
        const ind = [...this.parentTab.querySelectorAll(this.tab)].indexOf(e.target);

        _tab.call(this, this.parentTab, this.parentTabContent, this.activeClass, this.activeTabContentClass, tab, this.parentTabContent.querySelectorAll(this.tabContent)[ind]);

    }
}

function _tab(parentTab, parentTabContent,activeClassTab, activeClassTabContent, currentTab, currentTabContent) {
    _hideClassActiveFromTab.call(this, parentTab, '.' + activeClassTab);

    _addClassActiveToTab.call(this, currentTab, activeClassTab);

    _hideClassActiveFromTab.call(this, parentTabContent, '.' + activeClassTabContent);

    _addClassActiveToTab.call(this, currentTabContent, activeClassTabContent);
}

function _addClassActiveToTab(tab, activeClass) {
    tab.classList.add(activeClass);
}

function _hideClassActiveFromTab(parentTab, activeClass) {
   _deleteClassActiveFromTab.call(this, parentTab.querySelector(activeClass), activeClass.slice(1))
}

function _deleteClassActiveFromTab(tab, activeClass) {
    tab.classList.remove(activeClass);
}

function _searchTabContent(tabName) {
    return this.parentTabContent.querySelector('.' + tabName);
}

