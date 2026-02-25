import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'نام کاربری یا رمز عبور اشتباه است')
        return
      }

      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/users')
    } catch {
      setError('خطا در اتصال به سرور')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className="bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <Box
        bg="white"
        p={8}
        rounded="2xl"
        shadow="lg"
        w="full"
        maxW="md"
        className="border border-gray-200"
      >
        <Stack gap={6}>
          {/* Header */}
          <Stack gap={1} textAlign="center">
            <Heading size="2xl" color="blue.600">
              خوش آمدید
            </Heading>
            <Text color="gray.500" fontSize="sm">
              برای ورود اطلاعات خود را وارد کنید
            </Text>
          </Stack>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <Stack gap={4}>
              <Field.Root required>
                <Field.Label>نام کاربری</Field.Label>
                <Input
                  placeholder="نام کاربری را وارد کنید"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                  className="border-gray-300 focus:border-blue-500"
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>رمز عبور</Field.Label>
                <Input
                  type="password"
                  placeholder="رمز عبور را وارد کنید"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  className="border-gray-300 focus:border-blue-500"
                />
              </Field.Root>

              {/* Error Message */}
              {error && (
                <Box
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.200"
                  rounded="lg"
                  p={3}
                >
                  <Text color="red.600" fontSize="sm" textAlign="center">
                    {error}
                  </Text>
                </Box>
              )}

              <Button
                type="submit"
                colorPalette="blue"
                size="lg"
                width="full"
                loading={loading}
                loadingText="در حال ورود..."
                className="mt-2"
              >
                ورود
              </Button>
            </Stack>
          </form>

          {/* Hint */}
          <Box
            bg="blue.50"
            rounded="lg"
            p={3}
            className="border border-blue-200"
          >
            <Text fontSize="xs" color="blue.600" textAlign="center">
              برای تست: نام کاربری <strong>emilys</strong> و رمز{' '}
              <strong>emilyspass</strong>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoginPage
