import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { UseIsAuth } from '../utils/useIsAuth';



const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter()
    UseIsAuth()
    const [,createPost] = useCreatePostMutation()
        return (
          <Layout variant="small">
                <Formik
        initialValues={{ title:"", text:"" }}
        onSubmit={async (values) => {
          console.log(values)
          const {error} = await createPost({input: values})
          if(!error){
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="title"
            />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text"
                label="text"
                type="text"
              />
            </Box>
            
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
            </Layout>
        );
}










export default withUrqlClient(createUrqlClient)(CreatePost)