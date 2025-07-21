import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import '../css/theme.css';

// Initialize i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      'app.title': 'Canada Household Debt Monitor',
      'app.subtitle': 'Indicators of Household Indebtedness',
      'dashboard.title': 'Household Indebtedness Indicators',
      'dashboard.subtitle': 'Explore key metrics related to household debt in Canada',
      'dashboard.about': 'About This Dashboard',
      'dashboard.description': 'This dashboard provides insights into key indicators of household indebtedness in the Canadian housing market. The data is sourced from the Bank of Canada and is updated quarterly. Use the filters to explore different aspects of mortgage originations, loan-to-income ratios, and loan-to-value ratios.',
      'dashboard.dataSource': 'Data Source',
      'filter.title': 'Data Filters',
      'filter.indicator': 'Indicator Type',
      'filter.geography': 'Geography',
      'filter.incomeQuintile': 'Income Level',
      'filter.timeframe': 'Time Period',
      'filter.apply': 'Apply Filters',
      'filter.reset': 'Reset',
      'filter.hide': 'Hide Filters',
      'filter.show': 'Filter Chart',
      'chart.mortgageOriginations': 'Mortgage Originations',
      'chart.loanToIncome': 'Loan-to-Income Ratio',
      'chart.loanToValue': 'Loan-to-Value Ratio',
      'chart.debtServiceRatio': 'Mortgage Debt Service Ratio',
      'chart.debtServiceRatio.subtitle': 'Measures the proportion of income used to pay mortgage debt obligations',
      'chart.debtServiceRatio.yAxisTitle': 'Debt Service Ratio (%)',
      'chart.loanToIncome.subtitle': 'Shows the relationship between mortgage loan amounts and borrower income',
      'chart.loanToIncome.yAxisTitle': 'Loan-to-Income Ratio (%)',
      'chart.loanToValue.subtitle': 'Indicates the ratio of mortgage loan amount to the appraised value of the property',
      'chart.loanToValue.yAxisTitle': 'Loan-to-Value Ratio (%)',
      'chart.xAxisTitle': 'Date (by quarter)',
      'chart.creditPerformance': 'Household Credit Performance',

      // New filter labels
      'filter.dsrMetric': 'Debt Service Ratio Metric',
      'filter.ltiMetric': 'Loan-to-Income Metric',
      'filter.ltvMetric': 'Loan-to-Value Metric',
      'filter.buyerType': 'Buyer Type',
      'filter.insuranceStatus': 'Insurance Status',

      // DSR metric options
      'dsr.shareAbove25': 'Share of new mortgages (%) with a DSR above 25%',
      'dsr.median': 'Median mortgage DSR (%)',

      // DSR buyer type options
      'buyerType.all': 'All mortgages',
      'buyerType.byInsurance': 'By mortgage insurance status',
      'buyerType.byBuyerType': 'By type of home buyer',

      // LTI metric options
      'lti.shareAbove450': 'Share of new mortgages (%) with an LTI ratio above 450%',
      'lti.median': 'Median LTI ratio (%)',

      // LTI insurance status options
      'insurance.all': 'All mortgages',
      'insurance.byInsurance': 'By insurance status',
      'insurance.byBuyerType': 'By type of home buyer',

      // LTV metric options
      'ltv.average': 'Average LTV ratio (%)',
      'chart.noData': 'No data available for the selected filters',
      'chart.loading': 'Loading...',
      'chart.hideTable': 'Hide Data Table',
      'chart.showTable': 'Show Data Table',
      'chart.recentData': 'Recent Data',
      'chart.noRecentData': 'No recent data available for this chart.',
      'chart.date': 'Date',
      'chart.value': 'Value',
      'chart.seriesName': 'Series Name',
      'chart.na': 'N/A',
      'chart.defaultTitle': 'Household Debt Data',
      'disclaimer.title': 'Data Source Information',
      'disclaimer.content': 'This dashboard visualizes publicly available household debt data from the Bank of Canada.',
      'disclaimer.source': 'Source: Bank of Canada Valet API',
      'disclaimer.close': 'Close',
      'disclaimer.closeLabel': 'Close',
      'footer.copyright': 'Canada Household Debt Monitor',
      'footer.disclaimer': 'Data Disclaimer',
      'theme.toggle': 'Toggle theme',
      'lang.toggle': 'FR',
      'geography.canada': 'Canada (National)',
      'geography.ontario': 'Ontario',
      'geography.quebec': 'Quebec',
      'geography.bc': 'British Columbia',
      'geography.alberta': 'Alberta',
      'geography.atlantic': 'Atlantic Provinces',
      'geography.prairies': 'Prairie Provinces',
      'income.all': 'All Income Levels',
      'income.q1': 'Lowest 20%',
      'income.q2': 'Lower-Middle 20%',
      'income.q3': 'Middle 20%',
      'income.q4': 'Upper-Middle 20%',
      'income.q5': 'Highest 20%',
      'timeframe.1y': 'Last Year',
      'timeframe.5y': 'Last 5 Years',
      'timeframe.10y': 'Last 10 Years',
      'timeframe.max': 'Maximum Available'
    }
  },
  fr: {
    translation: {
      'app.title': 'Moniteur d\'endettement des ménages canadiens',
      'app.subtitle': 'Indicateurs d\'endettement des ménages',
      'dashboard.title': 'Indicateurs d\'endettement des ménages',
      'dashboard.subtitle': 'Explorez les indicateurs clés liés à l\'endettement des ménages au Canada',
      'dashboard.about': 'À propos de ce tableau de bord',
      'dashboard.description': 'Ce tableau de bord fournit des informations sur les indicateurs clés de l\'endettement des ménages sur le marché immobilier canadien. Les données proviennent de la Banque du Canada et sont mises à jour trimestriellement. Utilisez les filtres pour explorer différents aspects des originations hypothécaires, des ratios prêt-revenu et des ratios prêt-valeur.',
      'dashboard.dataSource': 'Source de données',
      'filter.title': 'Filtres de données',
      'filter.indicator': 'Type d\'indicateur',
      'filter.geography': 'Géographie',
      'filter.incomeQuintile': 'Niveau de revenu',
      'filter.timeframe': 'Période',
      'filter.apply': 'Appliquer les filtres',
      'filter.reset': 'Réinitialiser',
      'filter.hide': 'Masquer les filtres',
      'filter.show': 'Filtrer le graphique',
      'chart.mortgageOriginations': 'Originations hypothécaires',
      'chart.loanToIncome': 'Ratio prêt-revenu',
      'chart.loanToValue': 'Ratio prêt-valeur',
      'chart.debtServiceRatio': 'Ratio du service de la dette hypothécaire',
      'chart.debtServiceRatio.subtitle': 'Mesure la proportion du revenu utilisée pour payer les obligations de la dette hypothécaire',
      'chart.debtServiceRatio.yAxisTitle': 'Ratio du service de la dette (%)',
      'chart.loanToIncome.subtitle': 'Montre la relation entre les montants des prêts hypothécaires et le revenu des emprunteurs',
      'chart.loanToIncome.yAxisTitle': 'Ratio prêt-revenu (%)',
      'chart.loanToValue.subtitle': 'Indique le rapport entre le montant du prêt hypothécaire et la valeur estimée de la propriété',
      'chart.loanToValue.yAxisTitle': 'Ratio prêt-valeur (%)',
      'chart.xAxisTitle': 'Date (par trimestre)',
      'chart.creditPerformance': 'Performance du crédit des ménages',

      // New filter labels
      'filter.dsrMetric': 'Métrique du ratio du service de la dette',
      'filter.ltiMetric': 'Métrique du ratio prêt-revenu',
      'filter.ltvMetric': 'Métrique du ratio prêt-valeur',
      'filter.buyerType': 'Type d\'acheteur',
      'filter.insuranceStatus': 'Statut d\'assurance',

      // DSR metric options
      'dsr.shareAbove25': 'Part des nouveaux prêts hypothécaires (%) avec un ratio du service de la dette supérieur à 25%',
      'dsr.median': 'Ratio médian du service de la dette hypothécaire (%)',

      // DSR buyer type options
      'buyerType.all': 'Tous les prêts hypothécaires',
      'buyerType.byInsurance': 'Par statut d\'assurance hypothécaire',
      'buyerType.byBuyerType': 'Par type d\'acheteur de maison',

      // LTI metric options
      'lti.shareAbove450': 'Part des nouveaux prêts hypothécaires (%) avec un ratio prêt-revenu supérieur à 450%',
      'lti.median': 'Ratio prêt-revenu médian (%)',

      // LTI insurance status options
      'insurance.all': 'Tous les prêts hypothécaires',
      'insurance.byInsurance': 'Par statut d\'assurance',
      'insurance.byBuyerType': 'Par type d\'acheteur de maison',

      // LTV metric options
      'ltv.average': 'Ratio prêt-valeur moyen (%)',
      'chart.noData': 'Aucune donnée disponible pour les filtres sélectionnés',
      'chart.loading': 'Chargement...',
      'chart.hideTable': 'Masquer le tableau de données',
      'chart.showTable': 'Afficher le tableau de données',
      'chart.recentData': 'Données récentes',
      'chart.noRecentData': 'Aucune donnée récente disponible pour ce graphique.',
      'chart.date': 'Date',
      'chart.value': 'Valeur',
      'chart.seriesName': 'Nom de la série',
      'chart.na': 'N/D',
      'chart.defaultTitle': 'Données sur l\'endettement des ménages',
      'disclaimer.title': 'Informations sur la source des données',
      'disclaimer.content': 'Ce tableau de bord visualise les données d\'endettement des ménages publiquement disponibles de la Banque du Canada.',
      'disclaimer.source': 'Source: API Valet de la Banque du Canada',
      'disclaimer.close': 'Fermer',
      'disclaimer.closeLabel': 'Fermer',
      'footer.copyright': 'Moniteur d\'endettement des ménages canadiens',
      'footer.disclaimer': 'Avis de non-responsabilité',
      'theme.toggle': 'Changer de thème',
      'lang.toggle': 'EN',
      'geography.canada': 'Canada (National)',
      'geography.ontario': 'Ontario',
      'geography.quebec': 'Québec',
      'geography.bc': 'Colombie-Britannique',
      'geography.alberta': 'Alberta',
      'geography.atlantic': 'Provinces de l\'Atlantique',
      'geography.prairies': 'Provinces des Prairies',
      'income.all': 'Tous les niveaux de revenu',
      'income.q1': 'Les 20% les plus bas',
      'income.q2': '20% inférieurs-moyens',
      'income.q3': '20% moyens',
      'income.q4': '20% supérieurs-moyens',
      'income.q5': 'Les 20% les plus élevés',
      'timeframe.1y': 'Dernière année',
      'timeframe.5y': '5 dernières années',
      'timeframe.10y': '10 dernières années',
      'timeframe.max': 'Maximum disponible'
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
