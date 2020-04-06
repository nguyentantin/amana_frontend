import _ from 'lodash'

export const getProjects = state => _.get(state, 'dashboard.projects', []);
export const getProjectLoading = state => _.get(state, 'dashboard.projectLoading', false);
export const getAppBuilds = state => _.get(state, 'dashboard.appBuilds', []);
export const getAppBuildLoading = state => _.get(state, 'dashboard.appBuildLoading', false);
export const getAppBuildPagination = state => _.get(state, 'dashboard.appBuildPagination', false);
export const hasPaginate = state => {
  const paginate = getAppBuildPagination(state)
  const { current, lastPage } = paginate

  if (!paginate) {
    return false
  }

  if (_.isEmpty(paginate)) {
    return false
  }

  if (current === lastPage) {
    return false
  }

  return paginate.lastPage !== 1;
}
