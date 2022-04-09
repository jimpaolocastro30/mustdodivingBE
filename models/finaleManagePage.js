const mongoose = require('mongoose');

const fManagePageSchema = new mongoose.Schema(
    {   
        pageId: {
            type: String
        },
        pageUrl: {
            type: String
        },
        pageTitle: {
            type: String
        },
        pageDescription:{
            type:String
        },
        topbar:{
            type:String
        },
        topbarBgColor:{
            type:String
        },
        topbarSize:{
            type:String
        },
        menuFontFamily:{
            type:String
        },
        menuFontSize:{
            type:String
        },
        menuFontColor:{
            type:String
        },
        menuBgColor:{
            type:String
        },
        menuSize:{
            type:String
        },
        menuHorizontalPosition:{
            type:String
        },
        menuVerticalPosition:{
            type:String
        },
        menuType:{
            type:String
        },
        menuHoverColor:{
            type:String
        },
        menuLogoVerticalPosition:{
            type:String
        },
        menuLogoHorizontalPosition:{
            type:String
        },
        menuLogoType:{
            type:String
        },
        menuLogoSize:{
            type:String
        },
        menuLogoLocation:{
            type:String
        },
        mainBgColor:{
            type:String
        },
        mainMediaBg:{
            type:String
        },
        smType_:{
            type:String
        },
        socialMediaAccounts:{
            type: {},
            min: 200,
            max: 2000000
        },
        mediaFilterer:{
            type:String
        },
        footerSubscription:{
            type:String
        },
        footerSubscriptionText:{
            type:String
        },
        footerSubscriptionHorizontalPosition:{
            type:String
        },
        footerSubscriptionVerticalPosition:{
            type:String
        },
        footerBgColor:{
            type:String
        },
        footerSize:{
            type:String
        },
        footerHoverColor:{
            type:String
        },
        footerFontFamily:{
            type:String
        },
        footerFontSize:{
            type:String
        },
        footerFontColor:{
            type:String
        },
        footerLogoType:{
            type:String
        },
        footerLogoSize:{
            type:String
        },
        footerLogoHorizontalPosition:{
            type:String
        },
        footerLogoVerticalPosition:{
            type:String
        },
        footerCopyrightsText:{
            type:String
        },
        footerCopyrightsFontSize:{
            type:String
        },

        footerCopyrightsFontFamily:{
            type:String
        },

        footerCopyrightsColor:{
            type:String
        },

        headerMedia:{
            type:String
        },

        headerMediaType:{
            type:String
        },

        headerSlogan:{
            type:String
        },

        headerSloganFontFamily:{
            type:String
        },

        headerSloganFontSize:{
            type:String
        },

        headerSloganColor:{
            type:String
        },

        headerYoutubeLink:{
            type:String
        },

        headerMediaFiles:{
            type: {},
            min: 200,
            max: 2000000
        },
        mainContentItems:{
            type: {},
            min: 200,
            max: 2000000
        },
    },
    { timestamp: true }
);

module.exports = mongoose.model('fmanageMediaPage', fManagePageSchema);
