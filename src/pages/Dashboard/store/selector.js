import _ from 'lodash'

export const getProjects = state => _.get(state, 'dashboard.projects', []);
export const getProjectLoading = state => _.get(state, 'dashboard.projectLoading', false);
export const getAppBuilds = state => _.get(state, 'dashboard.appBuilds', []);
export const getAppBuildLoading = state => _.get(state, 'dashboard.appBuildLoading', false);
export const getAppBuildLoadMoreLoading = state => _.get(state, 'dashboard.appBuildLoadMoreLoading', false);
export const getAppBuildPagination = state => _.get(state, 'dashboard.appBuildPagination', false);
export const hasMore = state => {
  const paginate = getAppBuildPagination(state)
  const { current, lastPage } = paginate

  return !_.isEmpty(paginate) && current !== lastPage
}
