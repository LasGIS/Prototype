/*
 * Copyright (c) 2021. Prototype
 */

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from './languageDetector';

const resources = {
  en: {
    translation: {
      'postid.login.use-as': 'use as',
      'postid.login.account': 'Account',
      'postid.login.my-mail': 'My email',
      'postid.login.mail-arrived': 'Mail arrived',
      'landing.title1': 'API for',
      'landing.title2': 'Tracking of Shipments',
      'landing.destination': 'For online stores and large-scale senders',
      'landing.get-access': 'Get access',
      'landing.specification': 'Specification',
      'landing.agreement.title': 'User agreement',
      'landing.agreement.explanation': 'If you agree, we will connect you to the service and send access settings to your email',
      'landing.agreement.button': 'Agree and get access',
      'request.error.already-sent': 'Request for access to unlimited tracking was already submitted and is in process now.',
      'request.error.invalid-tin': 'Incorrect Individual Taxpayer Identification Number.',
      'request.error.already-approved': 'Request for access to unlimited tracking was already submitted and approved.',
      'request.error.external-service': 'Application-submission service is temporarily unavailable. Try to submit your request later.',
      'request.error.internal': 'Internal error of the application.',
      'request.error.unknown': 'Unknown error. Try reloading the page.',
      'request.error.unknown2': 'Unknown error:',
      'request.error.unknown3': '. Try reloading the page.',
      'request.already-sent.title': 'Your request is in process',
      'request.already-sent.info': 'Request for access to unlimited tracking was already submitted and is in process now.',
      'request.go-to': 'Go to',
      'request.link': 'My tracking',
      'request.sent.title': '\u2714 Request is sent',
      'request.sent.info': 'We will consider your request and will inform on the result via email',
      'request.title': 'Get access  to partnership service of tracking',
      'request.form.contract-number.label': 'Number of contract with Russian Post',
      'request.form.contract-number.error': 'Contract number is missing',
      'request.form.contract-date.label': 'Date of signing a contract',
      'request.form.contract-date.error': 'The date is missing',
      'request.form.contract-date.placeholder': 'DD-MM-YYYY',
      'request.form.org.title': 'Bank details of the company',
      'request.form.org-name.label': 'Company name',
      'request.form.org-name.error': 'Company name is missing',
      'request.form.tin.label': 'Individual Taxpayer Identification Number of the Russian Federation',
      'request.form.tin.error': 'Enter correct Individual Taxpayer Identification Number of the company',
      'request.form.contacts.title': 'Contacts',
      'request.form.surname.label': 'Surname',
      'request.form.surname.error': 'Enter your surname',
      'request.form.name.label': 'Name',
      'request.form.name.error': 'Enter your name',
      'request.form.second-name.label': 'Patronymic',
      'request.form.email.label': 'Email address',
      'request.form.phone.label': 'Mobile phone number',
      'request.form.region.label': 'Region',
      'request.form.region.error': 'Choose your region',
      'request.form.send': 'Send request',
      'request.partners-title': 'Send request',
      'request.destination': 'For legal entities according to the contract',
      'request.partners-info.0': 'Unlimited access to API for shipment tracking service',
      'request.partners-info.1': 'Payments may be effected on a non-cash basis',
      'request.partners-info.2': 'Facilitated process of acceptance of large amount of letters and parcels',
      'request.partners-info.3': 'Indirect/Direct mail',
      'request.partners.link': 'Sign a contract',
      'request.regions':
        '[{"code":"AD","name":"Republic of Adygea"},' +
        '{"code":"AL","name":"Republic of Altai"},' +
        '{"code":"BA","name":"Republic of Bashkortostan"},' +
        '{"code":"BU","name":"Republic of Buryatia"},' +
        '{"code":"DA","name":"Republic of Dagestan"},' +
        '{"code":"IN","name":"Republic of Ingushetia"},' +
        '{"code":"KB","name":"Kabardino-Balkar Republic"},' +
        '{"code":"KL","name":"Republic of Kalmykia"},' +
        '{"code":"KC","name":"Karachay-Cherkess Republic"},' +
        '{"code":"KR","name":"Republic of Karelia"},' +
        '{"code":"KO","name":"Komi Republic"},' +
        '{"code":"CR","name":"Republic of Crimea"},' +
        '{"code":"ME","name":"Mari El Republic"},' +
        '{"code":"MO","name":"Republic of Mordovia"},' +
        '{"code":"SA","name":"Republic of Sakha (Yakutia)"},' +
        '{"code":"SE","name":"Republic of North Ossetia-Alania"},' +
        '{"code":"TA","name":"Republic of Tatarstan"},' +
        '{"code":"TY","name":"Tuva Republic"},' +
        '{"code":"UD","name":"Udmurt Republic"},' +
        '{"code":"KK","name":"Republic of Khakassia"},' +
        '{"code":"CE","name":"Chechen Republic"},' +
        '{"code":"CU","name":"Chuvash Republic"},' +
        '{"code":"ALT","name":"Altai Krai"},' +
        '{"code":"ZAB","name":"Zabaykalsky Krai"},' +
        '{"code":"KAM","name":"Kamchatka Krai"},' +
        '{"code":"KDA","name":"Krasnodar Krai"},' +
        '{"code":"KYA","name":"Krasnoyarsk Krai"},' +
        '{"code":"PER","name":"Perm Krai"},' +
        '{"code":"PRI","name":"Primorsky Krai"},' +
        '{"code":"STA","name":"Stavropol Krai"},' +
        '{"code":"KHA","name":"Khabarovsk Krai"},' +
        '{"code":"AMU","name":"Amur Oblast"},' +
        '{"code":"ARK","name":"Arkhangelsk Oblast"},' +
        '{"code":"AST","name":"Astrakhan Oblast"},' +
        '{"code":"BEL","name":"Belgorod Oblast"},' +
        '{"code":"BRY","name":"Bryansk Oblast"},' +
        '{"code":"VLA","name":"Vladimir Oblast"},' +
        '{"code":"VGG","name":"Volgograd Oblast"},' +
        '{"code":"VLG","name":"Vologda Oblast"},' +
        '{"code":"VOR","name":"Voronezh Oblast"},' +
        '{"code":"IVA","name":"Ivanovo Oblast"},' +
        '{"code":"IRK","name":"Irkutsk Oblast"},' +
        '{"code":"KGD","name":"Kaliningrad Oblast"},' +
        '{"code":"KLU","name":"Kaluga Oblast"},' +
        '{"code":"KEM","name":"Kemerovo Oblast"},' +
        '{"code":"KIR","name":"Kirov Oblast"},' +
        '{"code":"KOS","name":"Kostroma Oblast"},' +
        '{"code":"KGN","name":"Kurgan Oblast"},' +
        '{"code":"KRS","name":"Kursk Oblast"},' +
        '{"code":"LIP","name":"Lipetsk Oblast"},' +
        '{"code":"MAG","name":"Magadan Oblast"},' +
        '{"code":"MOS","name":"Moscow Oblast"},' +
        '{"code":"MUR","name":"Murmansk Oblast"},' +
        '{"code":"NIZ","name":"Nizhny Novgorod Oblast"},' +
        '{"code":"NGR","name":"Novgorod Oblast"},' +
        '{"code":"NVS","name":"Novosibirsk Oblast"},' +
        '{"code":"OMS","name":"Omsk Oblast"},' +
        '{"code":"ORE","name":"Orenburg Oblast"},' +
        '{"code":"ORL","name":"Oryol Oblast"},' +
        '{"code":"PNZ","name":"Penza Oblast"},' +
        '{"code":"PSK","name":"Pskov Oblast"},' +
        '{"code":"ROS","name":"Rostov Oblast"},' +
        '{"code":"RYA","name":"Ryazan Oblast"},' +
        '{"code":"SAM","name":"Samara Oblast"},' +
        '{"code":"SAR","name":"Saratov Oblast"},' +
        '{"code":"SAK","name":"Sakhalin Oblast"},' +
        '{"code":"SVE","name":"Sverdlovsk Oblast"},' +
        '{"code":"SMO","name":"Smolensk Oblast"},' +
        '{"code":"TAM","name":"Smolensk Oblast"},' +
        '{"code":"TVE","name":"Smolensk Oblast"},' +
        '{"code":"TOM","name":"Tomsk Oblast"},' +
        '{"code":"TUL","name":"Tula Oblast"},' +
        '{"code":"TYU","name":"Tyumen Oblast"},' +
        '{"code":"ULY","name":"Ulyanovsk Oblast"},' +
        '{"code":"CHE","name":"Chelyabinsk Oblast"},' +
        '{"code":"YAR","name":"Yaroslavl Oblast"},' +
        '{"code":"MOW","name":"Moscow"},' +
        '{"code":"SPE","name":"Saint Petersburg and Leningrad Oblast"},' +
        '{"code":"YEV","name":"Jewish Autonomous Oblast"},' +
        '{"code":"NEN","name":"Nenets Autonomous Okrug"},' +
        '{"code":"KHM","name":"Khanty\u2013Mansi Autonomous Okrug \u2013 Yugra"},' +
        '{"code":"CHU","name":"Chukotka Autonomous Okrug"},' +
        '{"code":"YAN","name":"Yamalo-Nenets Autonomous Okrug"}]',
      'header.login': 'Login',
      'header.logout': 'Logout',
      'header.logo-label': 'Tracking API',
      'header.my-tracking': 'My tracking',
      'header.account-settings': 'Profile',
      'header.username': 'Username',
      'header.help': 'Support',
      'header.mobile.main': 'Home page',
      'header.mobile.tracking': 'Track',
      'header.mobile.letters': 'Letters',
      'header.mobile.parcels': 'Parcels',
      'header.mobile.postcards': 'Postcards',
      'header.mobile.money-transfer': 'Money orders',
      'header.mobile.offices': 'Post offices',
      'header.mobile.form-list': 'Blanks',
      'header.mobile.support': 'Support',
      'header.mobile.account-settings': 'My account',
      'header.mobile.login': 'Sign in',
      'header.mobile.logout': 'Sign out',
      'header.mobile.sign-in': 'Register',
      'header.mobile.press-center': 'Press center',
      'header.mobile.about': 'About the company',
      'settings.tracking.new-password-sent': 'New password was sent to email address {{email}}',
      'settings.tracking.access-data-sent': 'Data for access was sent to email address {{email}}',
      'settings.tracking.info.title': 'Access to tracking service',
      'settings.tracking.info.single.address': 'Address for single access',
      'settings.tracking.info.packet.address': 'Address for remote batch access',
      'settings.tracking.info.login.label': 'Login',
      'settings.tracking.send-options': 'Send settings data to email address',
      'settings.tracking.reset-password': 'Reset password',
      'settings.tracking.address.label': 'IP addresses of your system',
      'settings.tracking.address.queries': 'Only those queries that are sent from these IP addresses will be available',
      'settings.tracking.answer.header': 'Answer service',
      'settings.tracking.answer.address': 'Address',
      'settings.tracking.answer.login': 'Login',
      'settings.tracking.answer.password': 'Password',
      'settings.tracking.answer.save': 'Save',
      'settings.tracking.answer.disable': 'Disable',
      'stat.month.jan': 'JAN',
      'stat.month.feb': 'FEB',
      'stat.month.mar': 'MAR',
      'stat.month.apr': 'APR',
      'stat.month.may': 'MAY',
      'stat.month.jun': 'JUN',
      'stat.month.jul': 'JUL',
      'stat.month.aug': 'AUG',
      'stat.month.sep': 'SEP',
      'stat.month.oct': 'OCT',
      'stat.month.nov': 'NOV',
      'stat.month.dec': 'DEC',
      'stat.month.jan.full': 'January',
      'stat.month.feb.full': 'February',
      'stat.month.mar.full': 'March',
      'stat.month.apr.full': 'April',
      'stat.month.may.full': 'May',
      'stat.month.jun.full': 'June',
      'stat.month.jul.full': 'July',
      'stat.month.aug.full': 'August',
      'stat.month.sep.full': 'September',
      'stat.month.oct.full': 'October',
      'stat.month.nov.full': 'November',
      'stat.month.dec.full': 'December',
      'stat.request-sent': '\\u2714 Request is sent',
      'stat.request-sent.info': 'We will consider your request and will inform on the result via email',
      'stat.go-to': 'Go to',
      'stat.link': 'My tracking',
      'stat.access-approved': '\\u2714 Access is granted',
      'stat.data-sent': 'Data required for access was sent to email address {{email}}',
      'stat.get-ticket': 'Queries for tickets (getTicket)',
      'stat.get-response-by-ticket': 'Queries for results (getResponseByTicket)',
      'stat.no-data.0': 'A graph of service user\u2019s activity will appear here, when you start to send queries.',
      'stat.no-data.1': 'Data is updated once a day.',
      'stat.processed': 'Processed',
      'stat.limit-exceeded': 'The limit is exceeded',
      'stat.total-queries': 'Queries',
      'stat.processed-queries': 'Processed',
      'stat.granted-queries': 'Queries',
      'stat.limit': 'Limit',
      'stat.batch.queries': 'Queries',
      'stat.batch.responses': 'Responses',
      'stat.every-day': 'Daily',
      'stat.every-week': 'Weekly',
      'stat.notify-overlimit': 'Send notifications, if query limit is exceeded',
      'stat.send.label': 'Send statistic data to email {{email}}',
      'stat.selected.queries-processed': 'Queries processed',
      'stat.selected.preposition-number-of-total': 'of',
      'stat.selected.preposition-date-from': 'from',
      'stat.selected.preposition-date-to': 'to',
      'stat.left-menu.text-single-link': 'Single access',
      'stat.left-menu.text-batch-link': 'Batch access',
      'unlimited.false.0': 'Access is limited to 100 queries per day.',
      'unlimited.false.1':
        '\\ To get access to unlimited tracking, you need to sign a contract with Russian Post and contact your personal manager at Russian Post with a request to remove the restrictions.',
      'unlimited.true.0': 'Access to unlimited tracking is granted.',
      'error.message.user-unauthorized': 'User is not authorized',
      'error.message.external-service-unavailable': 'Could not get access. One of external services is unavailable.',
      'error.message.portal-backend-user-not-found': 'You need to get access to the tracking',
      'error.message.portal-backend-user-already-exists': 'Such User is already registered',
      'error.message.incomplete-post-id-user-profile': 'Incomplete user profile',
      'error.message.internal-server-error': 'Internal Application Error.',
      'error.message.resource-not-found': 'Resource not found',
      'error.description.1': 'Check your internet connection',
      'error.description.2': 'if there is no connection problems then delete cookies',
      'error.description.3': 'If it does not help, contact support',
      'incomplete-profile.title': 'Incomplete user profile',
      'incomplete-profile.explanation-prefix':
        'You should specify your name, second name and email to use Tracking API. Please fill this properties in your',
      'incomplete-profile.explanation-profile-word': 'profile',
      'error.page_not_found.title': 'Page not found',
      'error.page_not_found.description': 'Go to the home page or contact to support service.',
      'error.page_service_unavailable.title': 'Service is temporarily unavailable',
      'error.page_service_unavailable.description': 'Experts are solving the problem. If the error persists, contact support.',

      'russianpost.title': 'Russian Post',

      'russianpost.theme.footer': ' © JSC Russian Post',
      'russianpost.theme.support': 'Support',

      'russianpost.theme.back': 'Back',
      'russianpost.theme.specification': 'Specification',
      'russianpost.theme.tracking': 'My tracking',
      'russianpost.theme.statistics': 'Statistics',
      'russianpost.theme.accessSettings': 'Access settings',

      'LandingMessages.leftColumn':
        '<header>Single access</header><section>One shipment per request.</section><section>Up to 100 requests per day.</section><section>Unlimited access is granted</section><section>to clients <a href="/support">as per contract</a>.</section>',
      'LandingMessages.middleColumn':
        '<header>Batch access</header><section>Up to 3000 shipments per request.</section><section>Batch access is granted</section><section>only to clients <a href="/support">as per contract</a>.</section>',
      'LandingMessages.rightColumn':
        '<header>Statistics</header><section>Number of requests per day,</section><section>overlimit control,</section><section>email notifications.</section>',

      'dictionary.title': 'Technical references',
      'dictionary.identification': 'Identifier',
      'dictionary.operationCodes.title': 'The codes of the operations and attributes of the operations',
      'dictionary.operationCodes.note':
        'Note: for some operations, which require the attribute, API of shipment tracking may return attribute value of 0. The Client should interprete such attribute value as the absence of information on the attribute. This rule has only one exception: operation 8 (processing), which has attribute 0 (Sorting) as normal.',
      'dictionary.operationCodes.column1.title': 'Operation code',
      'dictionary.operationCodes.column2.title': 'Operation name',
      'dictionary.operationCodes.column3.title': 'Attribute code',
      'dictionary.operationCodes.column4.title': 'Attribute name',
      'dictionary.operationCodes.column5.title': 'Final operation or not',
      'dictionary.operationCodes.yes': 'Yes',
      'dictionary.operationCodes.noAttribute': 'no attribute',
      'dictionary.categoryCodes.title': 'Mail category codes',
      'dictionary.categoryCodes.column1.title': 'Code',
      'dictionary.categoryCodes.column2.title': 'Mail category',
      'dictionary.mailRanks.title': 'Mail rank codes',
      'dictionary.mailRanks.column1.title': 'Code',
      'dictionary.mailRanks.column2.title': 'Mail rank',
      'dictionary.mailTypes.title': 'Mail type codes',
      'dictionary.mailTypes.column1.title': 'Code',
      'dictionary.mailTypes.column2.title': 'Mail type',
      'dictionary.postmark.title': 'Mail mark codes',
      'dictionary.postmark.note':
        'Several mail marks may be assigned to one shipment. In the table below code value of each succeedent mark is two times greater than the code value of the preceding one, except for the value of the code «No code». Thus, every sum of code values of the marks assigned to any shipment is a unique number, which is used for generating data about the shipment.',
      'dictionary.postmark.column1.title': 'Code',
      'dictionary.postmark.column2.title': 'Mail mark',
      'dictionary.countries.title': 'Country directory',
      'dictionary.countries.column1.title': 'Id',
      'dictionary.countries.column2.title': 'Alpha2 code',
      'dictionary.countries.column3.title': 'Alpha3 code',
      'dictionary.countries.column4.title': 'Name of the country in Russian language',
      'dictionary.countries.column5.title': 'Name of the country in English language',
      'dictionary.countries.column6.title': 'Name of the country in French language',
      'dictionary.sendCtg.title': 'Sender Category Codes',
      'dictionary.sendCtg.note1': 'Code «International operator» is used to identify sender category of inward and transit international shipments.',
      'dictionary.sendCtg.note2':
        'Code «Post operator» is used to identify sender category of international shipments received from private operators at the office of exchange in Germany and sent to Russian Federation.',
      'dictionary.sendCtg.column1.title': 'Code',
      'dictionary.sendCtg.column2.title': 'Sender Category Name',
      'dictionary.eventType.title': 'Codes of cash-on-delivery (COD) operations',
      'dictionary.eventType.column1.title': 'Operation code',
      'dictionary.eventType.column2.title': 'Operation',
      'dictionary.eventType.column3.title': 'Description of the operation',
      'dictionary.technicalTerms.title': 'Technical terms',
      'dictionary.technicalTerms.column1.title': 'Term',
      'dictionary.technicalTerms.column2.title': 'Description',
    },
  },
  ru: {
    translation: {
      'postid.login.use-as': 'использовать как',
      'postid.login.account': 'Учетная запись',
      'postid.login.my-mail': 'Моя почта',
      'postid.login.mail-arrived': 'Прибыла посылка',
      'landing.title1': 'Отслеживание',
      'landing.title2': 'отправлений через API',
      'landing.destination': 'Для интернет-магазинов и крупных отправителей',
      'landing.get-access': 'Получить доступ',
      'landing.specification': 'Спецификация',
      'landing.agreement.title': 'Пользовательское соглашение',
      'landing.agreement.explanation': 'Если вы согласны, мы подключим сервис и отправим настройки доступа на почту',
      'landing.agreement.button': 'Согласиться и получить доступ',
      'request.error.already-sent': 'Заявка на подключение безлимитного трекинга уже была подана ранее и находится в обработке.',
      'request.error.invalid-tin': 'Некорректный ИНН.',
      'request.error.already-approved': 'Заявка на подключение безлимитного трекинга уже была подана ранее и одобрена.',
      'request.error.external-service': 'Сервис приема заявок временно недоступен. Попробуйте отправить заявку позже.',
      'request.error.internal': 'Внутренняя ошибка приложения.',
      'request.error.unknown': 'Неизвестная ошибка. Попробуйте обновить страницу.',
      'request.error.unknown2': 'Неизвестная ошибка:',
      'request.error.unknown3': '. Попробуйте обновить страницу.',
      'request.already-sent.title': 'Заявка в обработке',
      'request.already-sent.info': 'Заявка на подключение безлимитного трекинга уже была подана ранее и находится в обработке.',
      'request.go-to': 'Перейти в',
      'request.link': 'Мой трекинг',
      'request.sent.title': '\\u2714 Заявка отправлена',
      'request.sent.info': 'Мы рассмотрим заявку и сообщим о результате по электронной почте',
      'request.title': 'Подключение партнерского трекинга',
      'request.form.contract-number.label': 'Номер договора с Почтой России',
      'request.form.contract-number.error': 'Укажите номер договора',
      'request.form.contract-date.label': 'Дата заключения договора',
      'request.form.contract-date.error': 'Укажите дату договора',
      'request.form.contract-date.placeholder': 'ДД-ММ-ГГГГ',
      'request.form.org.title': 'Реквизиты организации',
      'request.form.org-name.label': 'Название организации',
      'request.form.org-name.error': 'Укажите название организации',
      'request.form.tin.label': 'ИНН',
      'request.form.tin.error': 'Укажите корректный ИНН организации',
      'request.form.contacts.title': 'Контакты',
      'request.form.surname.label': 'Фамилия',
      'request.form.surname.error': 'Укажите фамилию',
      'request.form.name.label': 'Имя',
      'request.form.name.error': 'Укажите имя',
      'request.form.second-name.label': 'Отчество',
      'request.form.email.label': 'Электронная почта',
      'request.form.phone.label': 'Мобильный телефон',
      'request.form.region.label': 'Регион',
      'request.form.region.error': 'Выберите регион',
      'request.form.send': 'Отправить заявку',
      'request.partners-title': 'Партнерские возможности',
      'request.destination': 'Для юридических лиц по договору',
      'request.partners-info.0': 'Безлимитный доступ к API сервиса отслеживания отправлений',
      'request.partners-info.1': 'Возможность безналичных расчетов',
      'request.partners-info.2': 'Упрощенный процесс отправки большого количества писем и посылок',
      'request.partners-info.3': 'Рассылка рекламных материалов',
      'request.partners.link': 'Заключение договора',
      'request.regions':
        '[' +
        '{"code":"AD","name":"Республика Адыгея"},' +
        '{"code":"AL","name":"Республика Алтай"},' +
        '{"code":"BA","name":"Республика Башкортостан"},' +
        '{"code":"BU","name":"Республика Бурятия"},' +
        '{"code":"DA","name":"Республика Дагестан"},' +
        '{"code":"IN","name":"Республика Ингушетия"},' +
        '{"code":"KB","name":"Кабардино-Балкарская Республика"},' +
        '{"code":"KL","name":"Республика Калмыкия"},' +
        '{"code":"KC","name":"Карачаево-Черкесская Республика"},' +
        '{"code":"KR","name":"Республика Карелия"},' +
        '{"code":"KO","name":"Республика КОМИ"},' +
        '{"code":"CR","name":"Республика Крым"},' +
        '{"code":"ME","name":"Республика Марий Эл"},' +
        '{"code":"MO","name":"Республика Мордовия"},' +
        '{"code":"SA","name":"Республика Саха (Якутия)"},' +
        '{"code":"SE","name":"Республика Северная Осетия-Алания"},' +
        '{"code":"TA","name":"Республика Татарстан"},' +
        '{"code":"TY","name":"Республика Тыва"},' +
        '{"code":"UD","name":"Удмуртская Республика"},' +
        '{"code":"KK","name":"Республика Хакасия"},' +
        '{"code":"CE","name":"Чеченская Республика"},' +
        '{"code":"CU","name":"Чувашская Республика"},' +
        '{"code":"ALT","name":"Алтайский край"},' +
        '{"code":"ZAB","name":"Забайкальский край"},' +
        '{"code":"KAM","name":"Камчатский край"},' +
        '{"code":"KDA","name":"Краснодарский край"},' +
        '{"code":"KYA","name":"Красноярский край"},' +
        '{"code":"PER","name":"Пермский край"},' +
        '{"code":"PRI","name":"Приморский край"},' +
        '{"code":"STA","name":"Ставропольский край"},' +
        '{"code":"KHA","name":"Хабаровский край"},' +
        '{"code":"AMU","name":"Амурская область"},' +
        '{"code":"ARK","name":"Архангельская область"},' +
        '{"code":"AST","name":"Астраханская область"},' +
        '{"code":"BEL","name":"Белгородская область"},' +
        '{"code":"BRY","name":"Брянская область"},' +
        '{"code":"VLA","name":"Владимирская область"},' +
        '{"code":"VGG","name":"Волгоградская область"},' +
        '{"code":"VLG","name":"Вологодская область"},' +
        '{"code":"VOR","name":"Воронежская область"},' +
        '{"code":"IVA","name":"Ивановская область"},' +
        '{"code":"IRK","name":"Иркутская область"},' +
        '{"code":"KGD","name":"Калининградская область"},' +
        '{"code":"KLU","name":"Калужская область"},' +
        '{"code":"KEM","name":"Кемеровская область"},' +
        '{"code":"KIR","name":"Кировская область"},' +
        '{"code":"KOS","name":"Костромская область"},' +
        '{"code":"KGN","name":"Курганская область"},' +
        '{"code":"KRS","name":"Курская область"},' +
        '{"code":"LIP","name":"Липецкая область"},' +
        '{"code":"MAG","name":"Магаданская область"},' +
        '{"code":"MOS","name":"Московская область"},' +
        '{"code":"MUR","name":"Мурманская область"},' +
        '{"code":"NIZ","name":"Нижегородская область"},' +
        '{"code":"NGR","name":"Новгородская область"},' +
        '{"code":"NVS","name":"Новосибирская область"},' +
        '{"code":"OMS","name":"Омская область"},' +
        '{"code":"ORE","name":"Оренбургская область"},' +
        '{"code":"ORL","name":"Орловская область"},' +
        '{"code":"PNZ","name":"Пензенская область"},' +
        '{"code":"PSK","name":"Псковская область"},' +
        '{"code":"ROS","name":"Ростовская область"},' +
        '{"code":"RYA","name":"Рязанская область"},' +
        '{"code":"SAM","name":"Самарская область"},' +
        '{"code":"SAR","name":"Саратовская область"},' +
        '{"code":"SAK","name":"Сахалинская область"},' +
        '{"code":"SVE","name":"Свердловская область"},' +
        '{"code":"SMO","name":"Смоленская область"},' +
        '{"code":"TAM","name":"Тамбовская область"},' +
        '{"code":"TVE","name":"Тверская область"},' +
        '{"code":"TOM","name":"Томская область"},' +
        '{"code":"TUL","name":"Тульская область"},' +
        '{"code":"TYU","name":"Тюменская область"},' +
        '{"code":"ULY","name":"Ульяновская область"},' +
        '{"code":"CHE","name":"Челябинская область"},' +
        '{"code":"YAR","name":"Ярославская область"},' +
        '{"code":"MOW","name":"Москва"},' +
        '{"code":"SPE","name":"Санкт-Петербург и Ленинградская область"},' +
        '{"code":"YEV","name":"Еврейская автономная область"},' +
        '{"code":"NEN","name":"Ненецкий автономный округ"},' +
        '{"code":"KHM","name":"Ханты-Мансийский автономный округ - Югра"},' +
        '{"code":"CHU","name":"Чукотский автономный округ"},' +
        '{"code":"YAN","name":"Ямало-Ненецкий автономный округ"}]',
      'header.login': 'Войти',
      'header.logout': 'Выйти',
      'header.logo-label': 'API отслеживания',
      'header.my-tracking': 'Мой трекинг',
      'header.account-settings': 'Профиль',
      'header.username': 'Имя пользователя',
      'header.help': 'Помощь',
      'header.mobile.main': 'Главная',
      'header.mobile.tracking': 'Отследить',
      'header.mobile.letters': 'Письма',
      'header.mobile.parcels': 'Посылки',
      'header.mobile.postcards': 'Открытки',
      'header.mobile.money-transfer': 'Денежные переводы',
      'header.mobile.offices': 'Отделения',
      'header.mobile.form-list': 'Бланки',
      'header.mobile.support': 'Помощь',
      'header.mobile.account-settings': 'Личный кабинет',
      'header.mobile.login': 'Войти',
      'header.mobile.logout': 'Выйти',
      'header.mobile.sign-in': 'Зарегистрироваться',
      'header.mobile.press-center': 'Пресс-центр',
      'header.mobile.about': 'О компании',
      'settings.tracking.new-password-sent': 'Новый пароль отправлен на почту {{email}}',
      'settings.tracking.access-data-sent': 'Данные для доступа отправлены на почту {{email}}',
      'settings.tracking.info.title': 'Подключение трекинга',
      'settings.tracking.info.single.address': 'Адрес для Единичного доступа',
      'settings.tracking.info.packet.address': 'Адрес для Пакетного доступа',
      'settings.tracking.info.login.label': 'Логин',
      'settings.tracking.send-options': 'Отправить настройки на почту',
      'settings.tracking.reset-password': 'Сбросить пароль',
      'settings.tracking.address.label': 'IP-адреса вашей системы',
      'settings.tracking.address.queries': 'Запросы будут доступны только с этих IP-адресов',
      'settings.tracking.answer.header': 'Сервис ответов',
      'settings.tracking.answer.address': 'Адрес',
      'settings.tracking.answer.login': 'Логин',
      'settings.tracking.answer.password': 'Пароль',
      'settings.tracking.answer.save': 'Сохранить',
      'settings.tracking.answer.disable': 'Отключить',
      'stat.month.jan': 'ЯНВ',
      'stat.month.feb': 'ФЕВ',
      'stat.month.mar': 'МАР',
      'stat.month.apr': 'АПР',
      'stat.month.may': 'МАЙ',
      'stat.month.jun': 'ИЮН',
      'stat.month.jul': 'ИЮЛ',
      'stat.month.aug': 'АВГ',
      'stat.month.sep': 'СЕН',
      'stat.month.oct': 'ОКТ',
      'stat.month.nov': 'НОЯ',
      'stat.month.dec': 'ДЕК',
      'stat.month.jan.full': 'Января',
      'stat.month.feb.full': 'Февраля',
      'stat.month.mar.full': 'Марта',
      'stat.month.apr.full': 'Апреля',
      'stat.month.may.full': 'Мая',
      'stat.month.jun.full': 'Июня',
      'stat.month.jul.full': 'Июля',
      'stat.month.aug.full': 'Августа',
      'stat.month.sep.full': 'Сентября',
      'stat.month.oct.full': 'Октября',
      'stat.month.nov.full': 'Ноября',
      'stat.month.dec.full': 'Декабря',
      'stat.request-sent': '\\u2714 Заявка отправлена',
      'stat.request-sent.info': 'Мы рассмотрим заявку и сообщим о результате по электронной почте',
      'stat.go-to': 'Перейти в',
      'stat.link': 'Мой трекинг',
      'stat.access-approved': '\\u2714 Доступ предоставлен',
      'stat.data-sent': 'Данные для доступа отправлены на почту {{email}}',
      'stat.get-ticket': 'Запросы билета (getTicket)',
      'stat.get-response-by-ticket': 'Запросы результата (getResponseByTicket)',
      'stat.no-data.0': 'Когда вы начнете присылать запросы, здесь появится график использования сервиса.',
      'stat.no-data.1': 'Данные обновляются один раз в сутки.',
      'stat.processed': 'Обработано',
      'stat.limit-exceeded': 'Лимит превышен',
      'stat.total-queries': 'Запросов',
      'stat.processed-queries': 'Обработано',
      'stat.granted-queries': 'Запросов',
      'stat.limit': 'Лимит',
      'stat.batch.queries': 'Запросов',
      'stat.batch.responses': 'Ответов',
      'stat.every-day': 'Ежедневно',
      'stat.every-week': 'Еженедельно',
      'stat.notify-overlimit': 'Отправлять оповещения о превышении количества запросов',
      'stat.send.label': 'Отправлять статистику на почту {{email}}',
      'stat.selected.queries-processed': 'Обработано запросов',
      'stat.selected.preposition-number-of-total': 'из',
      'stat.selected.preposition-date-from': 'с',
      'stat.selected.preposition-date-to': 'по',
      'stat.left-menu.text-single-link': 'Единичный доступ',
      'stat.left-menu.text-batch-link': 'Пакетный доступ',
      'unlimited.false.0': 'Доступ ограничен 100 запросами в сутки.',
      'unlimited.false.1':
        'Для получения безлимитного доступа необходимо оформить договор с Почтой России и обратиться к своему персональному менеджеру в Почте России с запросом на снятие ограничений.',
      'unlimited.true.0': 'Вам подключен безлимитный трекинг.',
      'error.message.user-unauthorized': 'Пользователь не авторизован',
      'error.message.external-service-unavailable': 'Не удалось получить доступ. Один из внешних сервисов не доступен.',
      'error.message.portal-backend-user-not-found': 'Вам необходимо получить доступ к трекингу',
      'error.message.portal-backend-user-already-exists': 'Такой Пользователь уже зарегистрирован',
      'error.message.incomplete-post-id-user-profile': 'Профиль пользователя не заполнен',
      'error.message.internal-server-error': 'Внутренняя ошибка приложения.',
      'error.message.resource-not-found': 'Ресурс не найден',
      'error.description.1': 'Проверьте подключение к интернету',
      'error.description.2': 'удалите файлы cookies, если нет проблем с подключением',
      'error.description.3': 'Если ничего не помогло, обратитесь к администратору',
      'incomplete-profile.title': 'Профиль пользователя не заполнен',
      'incomplete-profile.explanation-prefix':
        'Для работы с API отслеживания необходимо указать фамилию, имя и email. Для этого перейдите, пожалуйста, в свой',
      'incomplete-profile.explanation-profile-word': 'профиль',
      'error.page_not_found.title': 'Страница не найдена',
      'error.page_not_found.description': 'Перейдите на главную страницу или обратитесь в службу поддержки.',
      'error.page_service_unavailable.title': 'Сервис временно недоступен',
      'error.page_service_unavailable.description': 'Специалисты решают проблему. Если ошибка повторится — обратитесь в службу поддержки.',

      'russianpost.title': ' Почта Росcии',

      'russianpost.theme.footer': ' © АО Почта России',
      'russianpost.theme.support': 'Поддержка',

      'russianpost.theme.back': 'Назад',
      'russianpost.theme.specification': 'Спецификация',
      'russianpost.theme.tracking': 'Мой трекинг',
      'russianpost.theme.statistics': 'Статистика',
      'russianpost.theme.accessSettings': 'Настройки доступа',

      'LandingMessages.leftColumn':
        '<header>Единичный доступ</header><section>Одно отправление в запросе.</section><section>Лимит до 100 запросов в сутки, <a href="/support"> с договором </a> — без ограничений</section>',
      'LandingMessages.middleColumn':
        '<header>Пакетный доступ</header><section>До 3000 отправлений в запросе.</section><section>Доступен только клиентам <a href="/support">с договором </a></section>',
      'LandingMessages.rightColumn':
        '<header>Статистика</header><section>Количество запросов в день,</section><section>контроль превышения лимита,</section><section>оповещения на электронную почту</section>',

      'dictionary.title': 'Справочники',
      'dictionary.identification': 'Идентификатор',
      'dictionary.operationCodes.title': 'Коды операций над отправлениями и атрибутов операций',
      'dictionary.operationCodes.note':
        'Примечание: в отдельных случаях для операций, предполагающих обязательное наличие атрибута, API сервиса отслеживания может возвращать атрибут операции, равный 0. На стороне клиентского ПО такое значение атрибута необходимо интерпретировать как отсутствие информации об атрибуте. Исключением является только операция 8 (Обработка), у которой атрибут 0 (Сортировка) является штатным.',
      'dictionary.operationCodes.column1.title': 'Код операции',
      'dictionary.operationCodes.column2.title': 'Название операции',
      'dictionary.operationCodes.column3.title': 'Код атрибута',
      'dictionary.operationCodes.column4.title': 'Название атрибута',
      'dictionary.operationCodes.column5.title': 'Является конечной операцией',
      'dictionary.operationCodes.yes': 'Да',
      'dictionary.operationCodes.noAttribute': 'без атрибутов',
      'dictionary.categoryCodes.title': 'Коды категорий почтовых и непочтовых отправлений',
      'dictionary.categoryCodes.column1.title': 'Код',
      'dictionary.categoryCodes.column2.title': 'Категория отправления',
      'dictionary.mailRanks.title': 'Коды разрядов почтовых отправлений',
      'dictionary.mailRanks.column1.title': 'Код',
      'dictionary.mailRanks.column2.title': 'Разряд почтового отправления',
      'dictionary.mailTypes.title': 'Коды видов почтовых отправлений',
      'dictionary.mailTypes.column1.title': 'Код',
      'dictionary.mailTypes.column2.title': 'Вид отправления',
      'dictionary.postmark.title': 'Коды отметок почтовых отправлений',
      'dictionary.postmark.note':
        'Почтовому отправлению может быть присвоено несколько отметок. В представленной таблице значение кода каждой последующей отметки в два раза превышает значение предыдущей, исключая значение кода «Без отметок». Таким образом, сумма кодов любых отметок, присвоенных отправлению, является уникальным числом, которое используется при формировании данных об отправлении.',
      'dictionary.postmark.column1.title': 'Код',
      'dictionary.postmark.column2.title': 'Отметка почтового отправления',
      'dictionary.countries.title': 'Коды стран пересылки почтовых отправлений',
      'dictionary.countries.column1.title': 'Код',
      'dictionary.countries.column2.title': 'Alpha2 код',
      'dictionary.countries.column3.title': 'Alpha3 код',
      'dictionary.countries.column4.title': 'Наименование страны пересылки',
      'dictionary.countries.column5.title': 'Английское наименование страны пересылки',
      'dictionary.countries.column6.title': 'Французское наименование страны пересылки',
      'dictionary.sendCtg.title': 'Коды категорий отправителей',
      'dictionary.sendCtg.note1':
        'Код «Международный оператор» используется для идентификации категории отправителя входящих или транзитных международных почтовых отправлений.',
      'dictionary.sendCtg.note2':
        'Код «Почтовый оператор» используется для идентификации категории отправителя международных почтовых отправлений, принятых в месте обмена за границей в Германии от частных операторов и направляемых в РФ.',
      'dictionary.sendCtg.column1.title': 'Код',
      'dictionary.sendCtg.column2.title': 'Наименование категории отправителя',
      'dictionary.eventType.title': 'Коды операций с наложенным платежом',
      'dictionary.eventType.column1.title': 'Код операции',
      'dictionary.eventType.column2.title': 'Название операции',
      'dictionary.eventType.column3.title': 'Описание операции',
      'dictionary.technicalTerms.title': 'Специальные термины',
      'dictionary.technicalTerms.column1.title': 'Термин',
      'dictionary.technicalTerms.column2.title': 'Определение',
    },
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
