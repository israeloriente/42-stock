'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">42-stock documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminPageModule.html" data-type="entity-link" >AdminPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminPageModule-a00a61d1b5bc061499b58f3698818329ebb6dbea756a92c9066e8155b51e419ba4d055e52fec69881f91301cbe211e679ad363959ad05bdc771016552a58548f"' : 'data-target="#xs-components-links-module-AdminPageModule-a00a61d1b5bc061499b58f3698818329ebb6dbea756a92c9066e8155b51e419ba4d055e52fec69881f91301cbe211e679ad363959ad05bdc771016552a58548f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminPageModule-a00a61d1b5bc061499b58f3698818329ebb6dbea756a92c9066e8155b51e419ba4d055e52fec69881f91301cbe211e679ad363959ad05bdc771016552a58548f"' :
                                            'id="xs-components-links-module-AdminPageModule-a00a61d1b5bc061499b58f3698818329ebb6dbea756a92c9066e8155b51e419ba4d055e52fec69881f91301cbe211e679ad363959ad05bdc771016552a58548f"' }>
                                            <li class="link">
                                                <a href="components/AdminPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CooperatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CooperatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QrBannerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QrBannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminPageRoutingModule.html" data-type="entity-link" >AdminPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' : 'data-target="#xs-components-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' :
                                            'id="xs-components-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' : 'data-target="#xs-injectables-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' :
                                        'id="xs-injectables-links-module-AppModule-c30b1fb74502d430e06f5e8c909f7d5500f04bf22ebb69b6bab43aee144bac114e30943fdca6b16a14efe296fb54ae8971167cdc4cdd73fe64ae153ab66bdb68"' }>
                                        <li class="link">
                                            <a href="injectables/BarcodeProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BarcodeProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-3f5636c58e3f12593968b3bed5b19646e0cb55132ba55dc216701bd7fc3b5585f75426eac633dc2ccb1672c26e7a9cacb0acec3ea31dafc514baf53c2a9a71d6"' : 'data-target="#xs-components-links-module-ComponentsModule-3f5636c58e3f12593968b3bed5b19646e0cb55132ba55dc216701bd7fc3b5585f75426eac633dc2ccb1672c26e7a9cacb0acec3ea31dafc514baf53c2a9a71d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-3f5636c58e3f12593968b3bed5b19646e0cb55132ba55dc216701bd7fc3b5585f75426eac633dc2ccb1672c26e7a9cacb0acec3ea31dafc514baf53c2a9a71d6"' :
                                            'id="xs-components-links-module-ComponentsModule-3f5636c58e3f12593968b3bed5b19646e0cb55132ba55dc216701bd7fc3b5585f75426eac633dc2ccb1672c26e7a9cacb0acec3ea31dafc514baf53c2a9a71d6"' }>
                                            <li class="link">
                                                <a href="components/AddModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageStockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageStockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalManageStockComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalManageStockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerifiedSvgComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifiedSvgComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CooperatorPageModule.html" data-type="entity-link" >CooperatorPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CooperatorPageModule-b70e381be2e220b0fb01fab86be43912d4035ae2ac60ab01f089bb95e23a76519cc7de15a7b7771a2581f30cfbdec4853a7335a020cf2851203c03f669c7d751"' : 'data-target="#xs-components-links-module-CooperatorPageModule-b70e381be2e220b0fb01fab86be43912d4035ae2ac60ab01f089bb95e23a76519cc7de15a7b7771a2581f30cfbdec4853a7335a020cf2851203c03f669c7d751"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CooperatorPageModule-b70e381be2e220b0fb01fab86be43912d4035ae2ac60ab01f089bb95e23a76519cc7de15a7b7771a2581f30cfbdec4853a7335a020cf2851203c03f669c7d751"' :
                                            'id="xs-components-links-module-CooperatorPageModule-b70e381be2e220b0fb01fab86be43912d4035ae2ac60ab01f089bb95e23a76519cc7de15a7b7771a2581f30cfbdec4853a7335a020cf2851203c03f669c7d751"' }>
                                            <li class="link">
                                                <a href="components/CooperatorPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CooperatorPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CooperatorPageRoutingModule.html" data-type="entity-link" >CooperatorPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StudentPageModule.html" data-type="entity-link" >StudentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StudentPageModule-2533a2bc4b1248e68476ec3f6aa9e192f9edaf26a2dfe81ad24f40e82b791256ac39661bf7c359173df01b92ec8d8890e87ec1b3c151c034f55d89df37aeccbd"' : 'data-target="#xs-components-links-module-StudentPageModule-2533a2bc4b1248e68476ec3f6aa9e192f9edaf26a2dfe81ad24f40e82b791256ac39661bf7c359173df01b92ec8d8890e87ec1b3c151c034f55d89df37aeccbd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentPageModule-2533a2bc4b1248e68476ec3f6aa9e192f9edaf26a2dfe81ad24f40e82b791256ac39661bf7c359173df01b92ec8d8890e87ec1b3c151c034f55d89df37aeccbd"' :
                                            'id="xs-components-links-module-StudentPageModule-2533a2bc4b1248e68476ec3f6aa9e192f9edaf26a2dfe81ad24f40e82b791256ac39661bf7c359173df01b92ec8d8890e87ec1b3c151c034f55d89df37aeccbd"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StudentPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentPageRoutingModule.html" data-type="entity-link" >StudentPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BackendService.html" data-type="entity-link" >BackendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceService.html" data-type="entity-link" >DeviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Events.html" data-type="entity-link" >Events</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalService.html" data-type="entity-link" >GlobalService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Mail.html" data-type="entity-link" >Mail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Print.html" data-type="entity-link" >Print</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Report.html" data-type="entity-link" >Report</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stock.html" data-type="entity-link" >Stock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});