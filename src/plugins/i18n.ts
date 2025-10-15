import {createI18n} from 'vue-i18n'

const userLanguage = localStorage.getItem('lang') || 'en'

const i18n = createI18n({
  locale: userLanguage,  // default locale
  fallbackLocale: 'fa',  // fallback locale
  messages: {
    en: {
      message: {
        hello: 'hello world',
        dashboard: 'Dashboard',
        todos: 'Todos',
        weather: 'Weather',
        profile: 'Profile',
        english: 'English',
        persian: 'Persian',
        language: 'Language',
        appTitle: 'NadinSoft',
        goodMorning: 'Good morning',
        goodNoon: 'Good noon',
        goodAfternoon: 'Good afternoon',
        theme: 'Theme',
        userName: 'User name',
        darkTheme: 'Dark',
        lightTheme: 'Light',
        save: 'Save',
        customLengthError:'The {fieldName} should have at least {length} characters!',
        requiredField:'The {fieldName} is required!',
        formSubmited:'Changes have been done!',
        validationFailed:'Check the validation messages in the form!',
        add:'Add',
        description:'Description',
        status:'Status',
        actions:'Actions',
        edit:'Edit',
        cancel:'Cancel',
        pending:'Pending',
        done:'Done',
        toDoList:'To-Do List',
        redo:'Redo',
        appSetting:'App setting',
      }
    },
    fa: {
      message: {
        hello: 'سلام دنیا',
        dashboard: 'داشبورد',
        todos: 'کارها',
        weather: 'آب و هوا',
        profile: 'پروفایل',
        english: 'انگلیسی',
        persian: 'فارسی',
        language: 'زبان',
        appTitle: 'نادین سافت',
        goodMorning: 'صبح بخیر',
        goodNoon: 'ظهر بخیر',
        goodAfternoon: 'عصر بخیر',
        theme: 'قالب رنگی',
        userName: 'نام کاربری',
        darkTheme: 'تیره',
        lightTheme: 'روشن',
        save: 'ذخیره',
        customLengthError:'! فیلد {fieldName} باید حداقل شامل {length} کاراکتر باشد',
        requiredField:'! فیلد {fieldName} الزامی میباشد',
        formSubmited:'تغییرات مورد نیاز انجام شد!',
        validationFailed:'لطفا به خطاهای اعتبارسنجی لیست توجه کنید!',
        add:'افزودن',
        description:'توضیحات',
        status:'وضعیت',
        actions:'عملیات',
        edit:'ویرایش',
        cancel:'لغو',
        pending:'در انتظار',
        done:'انجام شده',
        toDoList:'لیست کارها',
        redo:'شروع مجدد',
        appSetting:'تنظیمات نرم افزار',
      }
    }
  }
})

export default i18n
