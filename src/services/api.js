/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { stringify } from "qs";
import request from "../utils/request";

const baseUrl = document.getElementById("httpPath").innerHTML;

/* add user */
export async function addUser(params) {
  return request(`${baseUrl}/dashboardUser`, {
    method: `POST`,
    body: {
      ...params,
      role: 1
    }
  });
}

/* delete user */
export async function deleteUser(params) {
  return request(`${baseUrl}/dashboardUser/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

/* update user */
export async function updateUser(params) {
  return request(`${baseUrl}/dashboardUser/${params.id}`, {
    method: `PUT`,
    body: {
      userName: params.userName,
      password: params.password,
      roles: params.roles,
      enabled: params.enabled,
      role: 1
    }
  });
}

/* check user password */
export async function checkUserPassword() {
  return request(`${baseUrl}/dashboardUser/check/password`, {
      method: `GET`
  });
}

/* update password */
export async function updatePassword(params) {
  return request(`${baseUrl}/dashboardUser/modify-password/${params.id}`, {
    method: `PUT`,
    body: {
      userName: params.userName,
      password: params.password,
      oldPassword: params.oldPassword
    }
  });
}

/* get all metadata */
export async function getAllMetadata(params) {
  const { path, currentPage, pageSize } = params;
  return request(
    `${baseUrl}/meta-data/queryList?${stringify(
      path ? params : { currentPage, pageSize }
    )}`,
    {
      method: `GET`
    }
  );
}

export async function findMetadata(params) {
  return request(`${baseUrl}/meta-data/${params.id}`, {
    method: `GET`
  });
}

/* addMetadata */
export async function addMetadata(params) {
  return request(`${baseUrl}/meta-data/createOrUpdate`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* updateMetadata */
export async function updateMetadata(params) {
  return request(`${baseUrl}/meta-data/createOrUpdate`, {
    method: `POST`,
    body: {
      appName: params.appName,
      enabled: params.enabled,
      id: params.id,
      pathDesc: params.pathDesc,
      methodName: params.methodName,
      parameterTypes: params.parameterTypes,
      path: params.path,
      rpcExt: params.rpcExt,
      rpcType: params.rpcType,
      serviceName: params.serviceName
    }
  });
}

/* syncData */
export async function syncData() {
  return request(`${baseUrl}/meta-data/syncData`, {
    method: `POST`,
    body: {}
  });
}

/* getfetchMetaGroup */
export async function getfetchMetaGroup() {
  return request(`${baseUrl}/meta-data/findAllGroup`, {
    method: `GET`
  });
}

/* deleteMetadata */
export async function deleteMetadata(params) {
  return request(`${baseUrl}/meta-data/batchDeleted`, {
    method: `POST`,
    body: [...params.list]
  });
}

/* updateEnabled */
export async function updateEnabled(params) {
  return request(`${baseUrl}/meta-data/batchEnabled`, {
    method: `POST`,
    body: {
      ids: params.list,
      enabled: params.enabled
    }
  });
}

/* getAllUsers */
export async function getAllUsers(params) {
  const { userName, currentPage, pageSize } = params;
  const myParams = userName ? params : { currentPage, pageSize };
  return request(`${baseUrl}/dashboardUser?${stringify(myParams)}`, {
    method: `GET`
  });
}

/* findUser */
export async function findUser(params) {
  return request(`${baseUrl}/dashboardUser/${params.id}`, {
    method: `GET`
  });
}

/* addPlugin */
export async function addPlugin(params) {
  const formData = new FormData();
  formData.append("name", params.name);
  if (params.config) formData.append("config", params.config);
  formData.append("sort", params.sort);
  formData.append("role", params.role);
  formData.append("enabled", params.enabled);
  if (params.file) {
    if(typeof params.file === 'string')
    {
      formData.append("file", params.file);
    }else {
      const base64Data = await readFileAsBase64(params.file);
      formData.append("file", base64Data);
    }
  }
  return request(`${baseUrl}/plugin`, {
    method: `POST`,
    body: formData,
  });
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

/* deletePlugin */
export async function deletePlugin(params) {
  return request(`${baseUrl}/plugin/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

/* updatePlugin */
export async function updatePlugin(params) {
  const formData = new FormData;
  formData.append("ids",params.id);
  formData.append("name",params.name);
  if(params.config) formData.append("config",params.config);
  formData.append("sort",params.sort);
  formData.append("role",params.role);
  formData.append("enabled",params.enabled);
  if (params.file ) {
    if(typeof params.file === 'string')
    {
      formData.append("file", params.file);
    }else {
      const base64Data = await readFileAsBase64(params.file);
      formData.append("file", base64Data);
    }
  }
  return request(`${baseUrl}/plugin/${params.id}`, {

    method: `PUT`,
    body: formData
  });
}

/* getAllPlugins */
export async function getAllPlugins(params) {
  return request(`${baseUrl}/plugin?${stringify(params)}`, {
    method: `GET`
  });
}

/* get Plugins snapshot */
export function activePluginSnapshot() {
  return request(`${baseUrl}/plugin/snapshot/active`, {
    method: `GET`
  });
}

/* findPlugin */
export async function findPlugin(params) {
  return request(`${baseUrl}/plugin/${params.id}`, {
    method: `GET`
  });
}

/* updatepluginEnabled */
export async function updatepluginEnabled(params) {
  return request(`${baseUrl}/plugin/enabled`, {
    method: `POST`,
    body: {
      ids: params.list,
      enabled: params.enabled
    }
  });
}

/* addAuth */
export async function addAuth(params) {
  return request(`${baseUrl}/appAuth`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* deleteAuth */
export async function deleteAuth(params) {
  return request(`${baseUrl}/appAuth/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

/* updateAuth */
export async function updateAuth(params) {
  return request(`${baseUrl}/appAuth/${params.id}`, {
    method: `PUT`,
    body: {
      appKey: params.appKey,
      appSecret: params.appSecret,
      enabled: params.enabled
    }
  });
}

/* getAllAuth */
export async function getAllAuth(params) {
  const { appKey, currentPage, pageSize } = params;
  let myParams = appKey ? params : { currentPage, pageSize };
  return request(`${baseUrl}/appAuth?${stringify(myParams)}`, {
    method: `GET`
  });
}

/* syncAuthsData */
export async function syncAuthsData() {
  return request(`${baseUrl}/appAuth/syncData`, {
    method: `POST`,
    body: {}
  });
}

/* getAllAuths */
export async function getAllAuths(params) {
  const { appKey, phone, currentPage, pageSize } = params;
  const myParams = appKey || phone ? params : { currentPage, pageSize };
  return request(`${baseUrl}/appAuth/findPageByQuery?${stringify(myParams)}`, {
    method: `GET`
  });
}

/* findAuthData */
export async function findAuthData(params) {
  return request(`${baseUrl}/appAuth/detail?id=${params.id}`, {
    method: `GET`
  });
}

/* findAuthDataDel */
export async function findAuthDataDel(params) {
  return request(`${baseUrl}/appAuth/detailPath?id=${params.id}`, {
    method: `GET`
  });
}

/* get all metadatas */
export async function getAllMetadatas() {
  return request(`${baseUrl}/meta-data/findAll`, {
    method: `GET`
  });
}

/* update auth */
export async function updateAuthData(params) {
  return request(`${baseUrl}/appAuth/updateDetail`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* update authDel */
export async function updateAuthDel(params) {
  return request(`${baseUrl}/appAuth/updateDetailPath`, {
    method: `POST`,
    body: params
  });
}

/* add auth */
export async function addAuthData(params) {
  return request(`${baseUrl}/appAuth/apply`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* batch enable auth */
export async function updateAuthEnabled(params) {
  return request(`${baseUrl}/appAuth/batchEnabled`, {
    method: `POST`,
    body: {
      ids: params.list,
      enabled: params.enabled
    }
  });
}

/* batch delete auth */
export async function deleteAuths(params) {
  return request(`${baseUrl}/appAuth/batchDelete`, {
    method: `POST`,
    body: [...params.list]
  });
}

/* find auth */
export async function findAuth(params) {
  return request(`${baseUrl}/appAuth/${params.id}`, {
    method: `GET`
  });
}

/* add selector */
export async function addSelector(params) {
  return request(`${baseUrl}/selector`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* delete selector */
export async function deleteSelector(params) {
  return request(`${baseUrl}/selector/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

/* update selector */
export async function updateSelector(params) {
  return request(`${baseUrl}/selector/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

/* get all selectors */
export async function getAllSelectors(params) {
  return request(`${baseUrl}/selector?${stringify(params)}`, {
    method: `GET`
  });
}

/* get single selector */
export async function findSelector(params) {
  return request(`${baseUrl}/selector/${params.id}`, {
    method: `GET`
  });
}

export async function getAllRules(params) {
  return request(`${baseUrl}/rule?${stringify(params)}`, {
    method: `GET`
  });
}

export async function addRule(params) {
  return request(`${baseUrl}/rule`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

export async function deleteRule(params) {
  return request(`${baseUrl}/rule/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

export async function findRule(params) {
  return request(`${baseUrl}/rule/${params.id}`, {
    method: `GET`
  });
}

export async function updateRule(params) {
  return request(`${baseUrl}/rule/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

/* query constants */
export async function queryPlatform() {
  return request(`${baseUrl}/platform/enum`, {
    method: `GET`
  });
}

/* login */
export async function queryLogin(params) {
  return request(`${baseUrl}/platform/login?${stringify(params)}`, {
    method: `GET`
  });
}

// sync all plugin
export async function asyncPlugin() {
  return request(`${baseUrl}/plugin/syncPluginAll`, {
    method: `POST`
  });
}

// 同步单个插件
export async function asyncOnePlugin(params) {
  return request(`${baseUrl}/plugin/syncPluginData/${params.id}`, {
    method: `PUT`
  });
}

// get plugin dropdown list
export async function getPluginDropDownList() {
  return request(`${baseUrl}/plugin/all`, {
    method: `GET`
  });
}

// get plugin handle list
export async function getAllPluginHandles(params) {
  return request(`${baseUrl}/plugin-handle?${stringify(params)}`, {
    method: `GET`
  });
}

// add plugin handle
export async function addPluginHandle(params) {
  return request(`${baseUrl}/plugin-handle`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

// get detail of plugin handle
export async function findPluginHandle(params) {
  return request(`${baseUrl}/plugin-handle/${params.id}`, {
    method: "GET"
  });
}

// update PluginHandle
export async function updatePluginHandle(params) {
  return request(`${baseUrl}/plugin-handle/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

// batchDeletePluginHandle
export async function batchDeletePluginHandle(params) {
  return request(`${baseUrl}/plugin-handle/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

export function fetchPluginHandleByPluginId(params) {
  return request(
    `${baseUrl}/plugin-handle/all/${params.pluginId}/${params.type}`,
    {
      method: `GET`
    }
  );
}

// create plugin resource
export function addPluginResource(params) {
  return request(`${baseUrl}/plugin/createPluginResource/${params.id}`, {
    method: `PUT`,
    body: params
  });
}

// fetch dict list
export async function fetchShenYuDicts(params) {
  return request(`${baseUrl}/shenyu-dict?${stringify(params)}`, {
    method: `GET`
  });
}

// add dict
export async function addShenYuDict(params) {
  return request(`${baseUrl}/shenyu-dict`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

// get dict detail
export async function findShenYuDict(params) {
  return request(`${baseUrl}/shenyu-dict/${params.id}`, {
    method: "GET"
  });
}

// update dict
export async function updateShenYuDict(params) {
  return request(`${baseUrl}/shenyu-dict/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

// batch delete dicts
export async function batchDeleteShenYuDict(params) {
  return request(`${baseUrl}/shenyu-dict/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

export function fetchShenYuDictByType(params) {
  return request(`${baseUrl}/shenyu-dict/all/${params.type}`, {
    method: `GET`
  });
}

export async function updateShenYuDictEnabled(params) {
  return request(`${baseUrl}/shenyu-dict/batchEnabled`, {
    method: `POST`,
    body: {
      ids: params.list,
      enabled: params.enabled
    }
  });
}

/* get all roles */
export async function getAllRoles() {
  return request(`${baseUrl}/role/getAllRoles`, {
    method: `GET`
  });
}

/* get roles by page */
export async function getRoleList(params) {
  const { roleName, currentPage, pageSize } = params;
  let myParams = { ...params };
  if (!roleName) {
    myParams = { currentPage, pageSize };
  }
  return request(`${baseUrl}/role?${stringify(myParams)}`, {
    method: `GET`
  });
}

/* find role */
export async function findRole(params) {
  return request(`${baseUrl}/role/${params.id}`, {
    method: `GET`
  });
}

/* add role */
export async function addRole(params) {
  return request(`${baseUrl}/role`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* delete role */
export async function deleteRole(params) {
  return request(`${baseUrl}/role/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

/* update role */
export async function updateRole(params) {
  return request(`${baseUrl}/role/${params.id}`, {
    method: `PUT`,
    body: {
      roleName: params.roleName,
      description: params.description,
      currentPermissionIds: params.currentPermissionIds
    }
  });
}

/* get resources by page */
export async function getAllResources(params) {
  const { title, currentPage, pageSize } = params;
  let myParams = { ...params };
  if (!title) {
    myParams = { currentPage, pageSize };
  }
  return request(`${baseUrl}/resource?${stringify(myParams)}`, {
    method: `GET`
  });
}

/* find resource */
export async function findResource(params) {
  return request(`${baseUrl}/resource/${params.id}`, {
    method: `GET`
  });
}

/* add resource */
export async function addResource(params) {
  return request(`${baseUrl}/resource`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* delete resource */
export async function deleteResource(params) {
  return request(`${baseUrl}/resource/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

/* update resource */
export async function updateResource(params) {
  return request(`${baseUrl}/resource/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

/* get buttons by menuId */
export async function getButtons(params) {
  return request(`${baseUrl}/resource/button?id=${params.id}`, {
    method: `GET`
  });
}

/* get menu tree */
export async function getMenuTree() {
  return request(`${baseUrl}/resource/menu`, {
    method: `GET`
  });
}

// get userPermission by token
export async function getUserPermissionByToken(params) {
  return request(
    `${baseUrl}/permission/getUserPermissionByToken?token=${params.token}`,
    {
      method: `GET`
    }
  );
}

/* get dataPermision's selectors by page */
export async function getDataPermisionSelectors(params) {
  return request(`${baseUrl}/data-permission/selector?${stringify(params)}`, {
    method: `GET`
  });
}

/* get dataPermision's rules by page */
export async function getDataPermisionRules(params) {
  return request(`${baseUrl}/data-permission/rules?${stringify(params)}`, {
    method: `GET`
  });
}

/* add dataPermision's selector */
export async function addDataPermisionSelector(params) {
  return request(`${baseUrl}/data-permission/selector`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/* add dataPermision's rule */
export async function addDataPermisionRule(params) {
  return request(`${baseUrl}/data-permission/rule`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and
/* delete dataPermision's selector */
export async function deleteDataPermisionSelector(params) {
  return request(`${baseUrl}/data-permission/selector`, {
    method: `DELETE`,
    body: {
      ...params
    }
  });
}

/* delete dataPermision's rule */
export async function deleteDataPermisionRule(params) {
  return request(`${baseUrl}/data-permission/rule`, {
    method: `DELETE`,
    body: {
      ...params
    }
  });
}

/* get new event recode logs */
export function getNewEventRecodLogList() {
  return request(`${baseUrl}/operation-record/log/list`, {
    method: `GET`
  });
}

/* get all api */
export function getDocMenus() {
  return request(`${baseUrl}/apidoc/getDocMenus`, {
    method: `GET`
  });
}

/* get api item */
export function getDocItem(params) {
  return request(`${baseUrl}/apidoc/getDocItem?${stringify(params)}`, {
    method: `GET`
  });
}

/* sandbox proxyGateway */
export function sandboxProxyGateway() {
  return `${baseUrl}/sandbox/proxyGateway`;
}

export function getRootTag() {
  return request(`${baseUrl}/tag/queryRootTag`, {
    method: `GET`
  });
}

/* getParentTagId */
export function getParentTagId(id) {
  return request(`${baseUrl}/tag/parentTagId/${id}`, {
    method: `GET`
  });
}

/* getTagDetail */
export function getTagDetail(id) {
  return request(
    `${baseUrl}/tag/id/${id}`, {
      method: `GET`
    });
}

/** add tag */
export function addTag(params) {
  return request(`${baseUrl}/tag`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/** delete tag */
export function deleteTag(params) {
  return request(`${baseUrl}/tag/batchDelete`, {
    method: `DELETE`,
    body: params
  });
}

/** updateTag */
export function updateTag(params) {
  return request(`${baseUrl}/tag/id/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

/* queryApi */
export function getApi(tagId) {
  return request(`${baseUrl}/api?tagId=${tagId}&currentPage=0&pageSize=100`, {
    method: `GET`
  });
}

/* queryApi */
export function getApiDetail(id) {
  return request(`${baseUrl}/api/${id}`, {
    method: `GET`
  });
}

/* queryMockRequest */
export function getApiMockRequest(apiId) {
  return request(`${baseUrl}/mock/${apiId}`, {
    method: `GET`
  });
}

/* createOrUpdateMockRequest */
export function createOrUpdateMockRequest(params) {
  return request(`${baseUrl}/mock/insertOrUpdate`, {
    method: `POST`,
    body: {
      ...params
    }
  })
}

/* createOrUpdateMockRequest */
export function deleteMockRequest(id) {
  return request(`${baseUrl}/mock/${id}`, {
    method: `DELETE`
  })
}

/** addApi */
export function addApi(params) {
  return request(`${baseUrl}/api`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

/** addApi */
export function updateApi(params) {
  return request(`${baseUrl}/api/${params.id}`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

/** delete Api */
export function deleteApi(params) {
  return request(`${baseUrl}/api/batch`, {
    method: `DELETE`,
    body: params
  });
}

export function fetchProxySelector(params) {
  return request(`${baseUrl}/proxy-selector?${stringify(params)}`,
    {
      method: `GET`
    });
}

export function addProxySelector(params) {
  return request(`${baseUrl}/proxy-selector/addProxySelector`,
    {
      method: `POST`,
      body: params
    });
}

export function deleteProxySelector(params) {
  return request(`${baseUrl}/proxy-selector/batch`,
    {
      method: `DELETE`,
      body: [...params.list]
    });
}

export function updateProxySelector(params) {
  return request(`${baseUrl}/proxy-selector/${params.id}`,
    {
      method: `PUT`,
      body: {
        ...params
      }
    });
}

export function getDiscoveryTypeEnums() {
  return request(`${baseUrl}/discovery/typeEnums`,
    {
      method: `GET`
    });
}

export function postDiscoveryInsertOrUpdate(params) {
  return request(`${baseUrl}/discovery/insertOrUpdate`,
    {
      method: `POST`,
      body: params
    });
}

export function getDiscovery(params) {
  return request(`${baseUrl}/discovery?${stringify(params)}`,
    {
      method: `GET`
    });
}

export function refreshProxySelector(params) {
  return request(`${baseUrl}/proxy-selector/fetch/${params.discoveryHandlerId}`,
    {
      method: `PUT`,
      body: {
        ...params
      }
    });
}

export function deleteDiscovery(params) {
  return request(`${baseUrl}/discovery/${params.discoveryId}`,
    {
      method: `DELETE`,
      body: {
        ...params
      }
    });
}

export function getAlertReceivers(params) {
  return request(`${baseUrl}/alert/receiver?${stringify(params)}`,
    {
      method: `GET`
    });
}

export function getAlertReceiverDetail(params) {
  return request(`${baseUrl}/alert/receiver/${params.id}`,
    {
      method: `GET`
    });
}

export function updateAlertReceiver(params) {
  return request(`${baseUrl}/alert/receiver`, {
    method: `PUT`,
    body: {
      ...params
    }
  });
}

export function addAlertReceiver(params) {
  return request(`${baseUrl}/alert/receiver`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}

export function deleteAlertReceivers(params) {
  return request(`${baseUrl}/alert/receiver/batch`, {
    method: `DELETE`,
    body: [...params.list]
  });
}

export function fetchAlertReport(params) {
  return request(`${baseUrl}/alert/receiver/test`, {
    method: `POST`,
    body: {
      ...params
    }
  });
}
