<template>
  <vue-drop-zone
    id="dropzone"
    ref="postPhotos"
    class="ag-dropzone-element"
    action="/"
    :options="dropOptions"
  >
  </vue-drop-zone>
</template>

<script>
import { Constants } from '@/scripts/conf/Constants'
import vue2Dropzone from 'vue2-dropzone'
// import ImageCompressor from 'image-compressor.js'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'ImagesDropZone',
  components: {
    vueDropZone: vue2Dropzone
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['zoneInstance', 'thumbnail', 'maxFiles', 'defMsg', 'isAvatar'],
  data() {
    const self = this
    return {
      dropZone: null,
      dropOptions: {
        url: '/',
        autoProcessQueue: false,
        paramName: 'file',
        clickable: true,
        maxFilesize: Constants.MAX_FILE_IMAGE_SIZE,
        maxFiles: this.maxFiles ? this.maxFiles : Constants.MAX_ALLOWED_IMAGES,
        addRemoveLinks: true,
        acceptedFiles: '.png,.jpg,.jpeg',
        thumbnailWidth: this.isAvatar ? 150 : 200,
        thumbnailHeight: this.isAvatar ? 150 : 200,
        dictDefaultMessage: this.defMsg
          ? this.defMsg
          : this.$t('dropzone.upload_images'),
        dictRemoveFile: this.$t('dropzone.erase'),
        dictInvalidFileType: this.$t('dropzone.wrong_format'),
        dictMaxFilesExceeded: this.$t('dropzone.max_img_limit'),
        dictFileTooBig: `${this.$t('dropzone.max_file_size')}${
          Constants.MAX_FILE_IMAGE_SIZE
        }${this.$t('dropzone.mb')}`,
        init() {
          self.dropZone = this
          self.zoneInstance.zone = this
          this.on('success', function () {})
          this.on('removedfile', function (file) {
            self.doAfterFileRemoved(file)
            if (self.isAvatar) {
              self.thumbnail.file = null
            }
          })
          this.on('addedfile', function (file) {
            self.resizeAddedImage(file)
            // Создаем thumbnail для первой закаченой картинки
            const isFirst = self.zoneInstance.zone.files.indexOf(file) === 0
            if (isFirst) {
              self.resizeAddedImage(
                file,
                200,
                200,
                self.isAvatar ? 'avatar' : 'thumb.' + file.name.split('.').pop()
              )
            }
            this.options.success(file)
          })
        }
      }
    }
  },
  created() {
    // this.$bus.off(Constants.BUS_RESET_DZONE)
    // this.$bus.on(Constants.BUS_RESET_DZONE, this.resetDropZone)
  },
  methods: {
    /**
     * Функция удаляющая файл из массифа фотографий в объекте дропзон.
     * Вызываеется после удаления пользоватеелем той или иной фотографии из виджета дропзон.
     * Также функция переписывает и обновляет thumbnail (специально для долбаебов и российских програмистов: thumbnail
     * это уменьшенная фотография для предпоказа да бы не скачивать полную фотографию и не занимать трафик, хотя зачем вам
     * дебилам это знать у вас же все через жопу делается, начиная от Лады калины до Яндекса)
     * Влад. 23/08/19
     */
    doAfterFileRemoved(file) {
      const files = this.zoneInstance.zone.files
      const i = files.findIndex(f => f.name === file.name)
      if (i > -1) {
        files.splice(i, 1)
        if (i === 0 && files.length) {
          this.resizeAddedImage(
            files[0],
            200,
            200,
            'thumb.' + files[0].name.split('.').pop()
          )
        }
      }
    },
    /**
     * Функция онуляющая ДропЗон очищая его от всех имеющихся картинок.
     * Вызывается после успешной публикации объявления.
     * Влад. 05/08/19
     */
    resetDropZone() {
      this.dropZone.removeAllFiles()
    }
    /**
     * Данная функция изменяет размер добавленой в Дропзон фотографии.
     * @param file - файл который нужно именить
     * @param width - Image required width
     * @param height - image required height
     * @param thumb - String thumbnail name
     * Влад. 04/08/19
     */
    // resizeAddedImage(file, width = 1000, height = 1000, thumb) {
    //   const self = this
    //   // eslint-disable-next-line no-new
    //   new ImageCompressor(file, {
    //     maxWidth: width,
    //     maxHeight: height,
    //     quality: thumb ? 1 : 0.6,
    //     success(newFile) {
    //       const origFileIndex = self.zoneInstance.zone.files.indexOf(file)
    //       const mimeString =
    //         file.type || file.dataURL.split(',')[0].split(':')[1].split(';')[0]
    //       const nf = new File([newFile], thumb || file.name, {
    //         type: mimeString
    //       })
    //       const origProps = [
    //         'upload',
    //         'status',
    //         'previewElement',
    //         'previewTemplate',
    //         'accepted'
    //       ]
    //
    //       origProps.forEach(function (p) {
    //         nf[p] = file[p]
    //       })
    //       if (!thumb) {
    //         self.zoneInstance.zone.files[origFileIndex] = nf
    //       } else {
    //         self.thumbnail.file = nf
    //       }
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
.ag-dropzone-element {
  margin: 40px 0 0 0;
}
</style>
