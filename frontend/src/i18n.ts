import { createI18n } from 'vue-i18n'

const messages = {
  it: {
    wechat: {
      qrcode:'Contattaci su wechat',
      error:'Nessun informazione trovata'
    },
    nav: {
      home: 'Home',
      blog: 'Notizie',
      insurance: 'Assicurazione',
      language: 'Lingua',
    },
    hero: {
      title: '益民工会',
      subtitle: 'Il tuo studio contabile di fiducia',
      button: 'I nostri servizi'
    },
    services: {
      fiscal: {
        title: 'Consulenza fiscale',
        desc: 'Gestiamo le tue tasse e documenti contabili in modo semplice e sicuro.'
      },
      report: {
        title: 'Bilanci e report',
        desc: 'Prepariamo bilanci chiari e report personalizzati per la tua azienda.'
      },
      admin: {
        title: 'Assistenza amministrativa',
        desc: 'Supporto completo per tutte le pratiche amministrative quotidiane.'
      }
    }
  },
  zh: {
    wechat: {
      qrcode:'微信咨询',
      error:'没有找到信息'
    },
    nav: {
      home: '首页',
      blog: '最新动态',
      insurance: '保险',
      language: '语言',
    },
    hero: {
      title: '益民工会',
      subtitle: '您可信赖的会计事务所',
      button: '我们的服务'
    },
    services: {
      fiscal: {
        title: '税务咨询',
        desc: '我们以简单安全的方式管理您的税务和会计文件。'
      },
      report: {
        title: '财务报表',
        desc: '为您的公司准备清晰的财务报表和个性化报告。'
      },
      admin: {
        title: '行政支持',
        desc: '提供所有日常行政事务的全方位支持。'
      }
    }
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: 'it',
  fallbackLocale: 'it',
  messages,
})
