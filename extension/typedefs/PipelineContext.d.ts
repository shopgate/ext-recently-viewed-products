import * as Logger from 'bunyan'

interface PipelineContext {
  config: PipelineConfiguration
  log: Logger
  storage: PipelineStorageContainer
}

interface PipelineStorage {
  get (key: string)

  set (key: string, value: string | number | Object)

  del (key: string)
}

interface PipelineStorageContainer {
  user: PipelineStorage
  device: PipelineStorage
  extension: PipelineStorage
}

interface PipelineConfiguration {
  merchantId: string
  merchantKey: string
}
