let app = angular.module('MyApp', ['ngRoute', 'pascalprecht.translate'])

const translationsDE = {
    HEADLINE: 'AngularJS Lokalisierung',
    LABEL: 'Bitte wählen Sie eine Sprache aus'
}

const translationsEN = {
    HEADLINE: 'AngularJS Localization',
    LABEL: 'Please select one language'
}

app.config(['$translateProvider', '$locationProvider', function ($translateProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('de', translationsDE);
    $translateProvider.fallbackLanguage('en');
    $translateProvider.preferredLanguage('en');
}])

app.controller('mainController', ['$scope', '$location', '$translate', function ($scope, $location, $translate) {
    $scope.languages = [
        {
            name: "English",
            lang: "en"
        },
        {
            name: "Deutsche",
            lang: "de"
        }
    ];
    $scope.selected = $scope.languages[0];

    this.init = function () {
        const query = $location.search();
        if (query.lang) {
            $translate.use(query.lang)
            for (const item of $scope.languages) {
                if (item.lang == query.lang) {
                    $scope.selected = item;
                    break;
                }
            }
        }
    }

    this.changeLanguage = function () {
        const lang = $scope.selected.lang;
        $translate.use(lang)
    }

    this.init();
}])