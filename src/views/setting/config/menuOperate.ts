import orgCtrl from '@/ts/controller';
import { loadFileMenus } from '@/executor/fileOperate';
import { MenuItemType } from 'typings/globelType';
import { IDepartment, IGroup, ITarget, IDirectory, IApplication, IWork } from '@/ts/core';

/** 创建团队菜单 */
const createMenu = (target: ITarget, children: MenuItemType[]) => {
  children.unshift(
    ...buildDirectoryTree([target.memberDirectory]),
    ...buildApplicationTree(target.directory.applications),
  );
  return {
    key: target.directory.key,
    item: target.directory,
    label: target.name,
    itemType: target.directory.typeName,
    menus: loadFileMenus(target.directory, 2),
    tag: [target.typeName],
    icon: '',
    children: children,
  };
};
/** 编译部门树 */
const buildDepartmentTree = (departments: IDepartment[]): MenuItemType[] => {
  return departments.map((item) =>
    createMenu(item, [
      ...buildDirectoryTree(item.directory.children),
      ...buildDepartmentTree(item.children),
    ]),
  );
};
/** 编译组织集群树 */
const buildGroupTree = (groups: IGroup[]): MenuItemType[] => {
  return groups.map((item) =>
    createMenu(item, [
      ...buildDirectoryTree(item.directory.children),
      ...buildGroupTree(item.children),
    ]),
  );
};

/** 编译目录树 */
const buildDirectoryTree = (directorys: IDirectory[]): MenuItemType[] => {
  return directorys
    .filter((i) => !i.groupTags.includes('已删除'))
    .map((directory) => {
      return {
        key: directory.key,
        item: directory,
        label: directory.name,
        tag: [directory.typeName],
        icon: '',
        itemType: directory.typeName,
        menus: loadFileMenus(directory),
        children: [
          ...buildDirectoryTree(directory.children),
          ...buildApplicationTree(directory.applications),
        ],
      };
    });
};

const buildWorks = (works: IWork[]): MenuItemType[] => {
  return works
    .filter((i) => i.isContainer)
    .map((work) => {
      return {
        key: work.key,
        item: work,
        label: work.name,
        tag: [work.typeName],
        icon: '',
        itemType: work.typeName,
        menus: loadFileMenus(work),
        children: buildForms(work),
      };
    });
};

const buildForms = (work: IWork): MenuItemType[] => {
  return work.content().map((form) => {
    return {
      key: form.key,
      item: form,
      label: form.name,
      tag: [form.typeName],
      icon: '',
      itemType: form.typeName,
      menus: loadFileMenus(form),
      children: [],
    };
  });
};

/** 编译目录树 */
const buildApplicationTree = (applications: IApplication[]): MenuItemType[] => {
  return applications.map((application) => {
    return {
      key: application.key,
      item: application,
      label: application.name,
      tag: [application.typeName],
      icon: '',
      itemType: application.typeName,
      menus: loadFileMenus(application),
      children: [
        ...buildApplicationTree(application.children),
        ...buildWorks(application.works),
      ],
    };
  });
};

/** 获取个人菜单 */
const getUserMenu = () => {
  return createMenu(orgCtrl.user, [
    ...buildDirectoryTree(orgCtrl.user.directory.children),
    ...orgCtrl.user.cohorts.map((i) =>
      createMenu(i, buildDirectoryTree(i.directory.children)),
    ),
  ]);
};

/** 获取组织菜单 */
const getTeamMenu = () => {
  const children: MenuItemType[] = [];
  for (const company of orgCtrl.user.companys) {
    children.push(
      createMenu(company, [
        ...buildDirectoryTree(company.directory.children),
        ...buildDepartmentTree(company.departments),
        ...buildGroupTree(company.groups),
        ...company.cohorts.map((i) =>
          createMenu(i, buildDirectoryTree(i.directory.children)),
        ),
      ]),
    );
  }
  return children;
};

/** 加载设置模块菜单 */
export const loadSettingMenu = () => {
  return {
    key: '设置',
    label: '设置',
    itemType: 'Tab',
    item: 'disk',
    children: [getUserMenu(), ...getTeamMenu()],
    icon: '',
  };
};
