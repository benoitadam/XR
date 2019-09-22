import * as Parse from 'parse/node';

Parse.Cloud.afterSave(Parse.User, (request: any) => {
  request.log.info('Parse.Cloud.afterSave');
});
