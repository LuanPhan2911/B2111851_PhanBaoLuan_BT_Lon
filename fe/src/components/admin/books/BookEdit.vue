<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import BookService from "@/services/BookService";
import { computed, ref } from "vue";
import SelectImage from "../../layouts/SelectImage.vue";
import defaultBook from "@/assets/images/default_book.png";
import { useBookSchema } from "@/hooks/useBookSchema";
import { useRouter } from "vue-router";
export default {
  components: { Form, Field, ErrorMessage, SelectImage },
  props: ["genres", "publishers", "book"],
  name: "BookEdit",
  setup(props) {
    const router = useRouter();
    const book = computed(() => props.book);
    const { bookSchema } = useBookSchema();
    const imgUploaded = ref(null);
    const genres = computed(() => props.genres);
    const publishers = computed(() => props.publishers);
    const onUpdate = async () => {
      try {
        let data = await BookService.update({
          _id: book.value._id,
          data: book.value,
        });
        if (data && imgUploaded.value) {
          let { _id } = data;
          const formData = new FormData();
          formData.append("image", imgUploaded.value);
          await BookService.updateImage({
            _id,
            data: formData,
          });
        }
        if (data) {
          router.push({
            name: "adminBookView",
          });
        }
      } catch (error) {}
    };
    const getImage = (file) => {
      if (file) {
        imgUploaded.value = file;
      }
    };
    return {
      bookSchema,
      book,
      genres,
      publishers,
      defaultBook,
      onUpdate,
      getImage,
    };
  },
};
</script>
<template>
  <Form @submit="onUpdate" :validationSchema="bookSchema">
    <div class="row">
      <div class="col-auto">
        <div class="mb-3">
          <select-image
            :imgDefault="defaultBook"
            :imgUrl="book?.image"
            @getImage="getImage"
          />
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="" class="form-label">Name</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-alt"></i>
            </span>
            <field
              type="text"
              class="form-control"
              placeholder="Name"
              name="name"
              v-model="book.name"
            />
          </div>
          <error-message name="name" class="text-danger" />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">AuthorName</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-pen"></i>
            </span>
            <field
              type="text"
              class="form-control"
              placeholder="Author Name"
              name="author_name"
              v-model="book.author_name"
            />
          </div>
          <error-message name="author_name" class="text-danger" />
        </div>

        <div class="row">
          <div class="col-lg-4">
            <label for="" class="form-label">TotalQuantity</label>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-archive"></i>
                </span>
                <field
                  type="number"
                  class="form-control"
                  placeholder="Total Quantity"
                  name="total_quantity"
                  v-model="book.total_quantity"
                />
              </div>
              <error-message name="total_quantity" class="text-danger" />
            </div>
          </div>
          <div class="col-lg-4">
            <label for="" class="form-label">RemainQuantity</label>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-archive"></i>
                </span>
                <field
                  type="number"
                  class="form-control"
                  placeholder="Remain Quantity"
                  name="remain_quantity"
                  v-model="book.remain_quantity"
                />
              </div>
              <error-message name="remain_quantity" class="text-danger" />
            </div>
          </div>
          <div class="col-lg-4">
            <label for="" class="form-label">YearPublish</label>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-keyboard"></i>
                </span>
                <field
                  type="text"
                  class="form-control"
                  placeholder="Year Publish"
                  name="year_publish"
                  v-model="book.year_publish"
                />
              </div>
              <error-message name="year_publish" class="text-danger" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <label for="" class="form-label">Genres</label>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-projector"></i>
              </span>
              <div class="col">
                <v-select
                  multiple
                  :options="genres"
                  label="name"
                  v-model="book.genres"
                  placeholder="Genres"
                ></v-select>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <label for="" class="form-label">Publisher</label>
            <div class="input-group mb-3">
              <span class="input-group-text">
                <i class="bi bi-cake"></i>
              </span>
              <div class="col">
                <v-select
                  :options="publishers"
                  label="name"
                  v-model="book.publisher"
                  placeholder="Publisher"
                ></v-select>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <field
            as="textarea"
            class="form-control"
            id="description"
            rows="5"
            name="description"
            v-model="book.description"
          ></field>
          <error-message name="description" class="text-danger" />
        </div>
        <div class="mb-3 d-flex justify-content-center">
          <button class="btn btn-primary px-5 d-block" type="submit">
            Update
          </button>
        </div>
      </div>
    </div>
  </Form>
</template>
