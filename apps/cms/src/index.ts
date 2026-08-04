import type { Core } from '@strapi/strapi';

const inquiryUid = 'api::cooperation-inquiry.cooperation-inquiry';

type ContentManagerConfigurationService = {
  findConfiguration: (contentType: unknown) => Promise<{
    settings: Record<string, unknown>;
    metadatas: Record<string, Record<string, unknown>>;
    layouts: {
      list: string[];
      edit: unknown;
    };
    options?: Record<string, unknown>;
  }>;
  updateConfiguration: (contentType: unknown, configuration: {
    settings: Record<string, unknown>;
    metadatas: Record<string, Record<string, unknown>>;
    layouts: {
      list: string[];
      edit: unknown;
    };
    options?: Record<string, unknown>;
  }) => Promise<unknown>;
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const contentManager = strapi.plugin('content-manager');
    const configurationService = contentManager?.service('content-types') as
      | ContentManagerConfigurationService
      | undefined;
    const contentType = strapi.contentType(inquiryUid);

    if (!configurationService || !contentType) {
      return;
    }

    const configuration = await configurationService.findConfiguration(contentType);
    const createdAtMetadata = configuration.metadatas.createdAt || {};

    await configurationService.updateConfiguration(contentType, {
      ...configuration,
      settings: {
        ...configuration.settings,
        defaultSortBy: 'createdAt',
        defaultSortOrder: 'DESC',
      },
      metadatas: {
        ...configuration.metadatas,
        createdAt: {
          ...createdAtMetadata,
          edit: {
            ...(createdAtMetadata.edit || {}),
            visible: false,
          },
          list: {
            ...(createdAtMetadata.list || {}),
            label: '提交时间',
            searchable: true,
            sortable: true,
          },
        },
      },
      layouts: {
        ...configuration.layouts,
        list: ['name', 'organization', 'phone', 'createdAt'],
      },
    });
  },
};
