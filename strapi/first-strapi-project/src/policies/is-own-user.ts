const { errors } = require('@strapi/utils');
const { PolicyError } = errors;

export default (policyContext, config, { strapi }) => {
  const currentUser = policyContext.state.user;

  if (!currentUser) {
    throw new PolicyError('请登录！');
  }

  const targetUserId = parseInt(policyContext.params.id);

  if (!isNaN(targetUserId) && currentUser.id !== targetUserId) {
    throw new PolicyError('无法操作不属于当前登录用户的资源！');
  }

  return true;
};