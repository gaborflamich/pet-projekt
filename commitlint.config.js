const DISABLED_RULE = 0;
const WARNING_IF_FAILED_RULE = 1;
const ERROR_IF_FAILED_RULE = 2;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
    'jira-ticket-rule': [WARNING_IF_FAILED_RULE, 'always'],
  },
  plugins: [
    {
      rules: {
        'jira-ticket-rule': (commit) => {
          /**
           * from https://stackoverflow.com/a/30518972
           */
          const jiraRegex = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;
          return [[...commit.raw].reverse().join('').match(jiraRegex), `Your commit message should contain a valid JIRA ticket ID`];
        },
      },
    },
  ],
};
