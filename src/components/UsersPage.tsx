import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Spinner,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { fetchUsers } from './../َapi/users.api'
import type { User } from './../types/user.types'

const LIMIT = 10

function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totalPages = Math.ceil(total / LIMIT)

  const loadUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchUsers(page, LIMIT, search)
      setUsers(data.users)
      setTotal(data.total)
    } catch {
      setError('خطا در بارگذاری کاربران')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [page, search])

  const handleSearch = () => {
    setPage(1)
    setSearch(searchInput)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleClear = () => {
    setSearchInput('')
    setSearch('')
    setPage(1)
  }

  return (
    <Box minH="100vh" bg="gray.50" p={6}>
      <Stack gap={6} maxW="1200px" mx="auto">

        {/* Header */}
        <Flex justify="space-between" align="center">
          <Stack gap={0}>
            <Heading size="xl" color="gray.800">
              مدیریت کاربران
            </Heading>
            <Text color="gray.500" fontSize="sm">
              تعداد کل: {total} کاربر
            </Text>
          </Stack>
        </Flex>

        {/* Search Bar */}
        <Box
          bg="white"
          p={4}
          rounded="xl"
          shadow="sm"
          className="border border-gray-200"
        >
          <HStack gap={3}>
            <Input
              placeholder="جستجو بر اساس نام، ایمیل..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              flex={1}
            />
            <Button colorPalette="blue" onClick={handleSearch}>
              جستجو
            </Button>
            {search && (
              <Button variant="outline" onClick={handleClear}>
                پاک کردن
              </Button>
            )}
          </HStack>
        </Box>

        {/* Content */}
        <Box
          bg="white"
          rounded="xl"
          shadow="sm"
          className="border border-gray-200"
          overflow="hidden"
        >
          {loading ? (
            <Flex justify="center" align="center" p={16}>
              <Spinner size="xl" color="blue.500" />
            </Flex>
          ) : error ? (
            <Flex justify="center" align="center" p={16}>
              <Text color="red.500">{error}</Text>
            </Flex>
          ) : (
            <Table.Root variant="line" size="md">
              <Table.Header bg="gray.50">
                <Table.Row>
                  <Table.ColumnHeader>کاربر</Table.ColumnHeader>
                  <Table.ColumnHeader>ایمیل</Table.ColumnHeader>
                  <Table.ColumnHeader>تلفن</Table.ColumnHeader>
                  <Table.ColumnHeader>سن / جنسیت</Table.ColumnHeader>
                  <Table.ColumnHeader>شرکت</Table.ColumnHeader>
                  <Table.ColumnHeader>شهر</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row
                    key={user.id}
                    _hover={{ bg: 'blue.50' }}
                    transition="background 0.15s"
                  >
                    {/* Avatar + Name */}
                    <Table.Cell>
                      <HStack gap={3}>
                        <Avatar.Root size="sm">
                          <Avatar.Image src={user.image} />
                          <Avatar.Fallback>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <Stack gap={0}>
                          <Text fontWeight="medium" fontSize="sm">
                            {user.firstName} {user.lastName}
                          </Text>
                          <Text color="gray.400" fontSize="xs">
                            @{user.username}
                          </Text>
                        </Stack>
                      </HStack>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">
                        {user.email}
                      </Text>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">
                        {user.phone}
                      </Text>
                    </Table.Cell>

                    <Table.Cell>
                      <HStack gap={2}>
                        <Text fontSize="sm">{user.age}</Text>
                        <Badge
                          colorPalette={
                            user.gender === 'male' ? 'blue' : 'pink'
                          }
                          size="sm"
                        >
                          {user.gender === 'male' ? 'مرد' : 'زن'}
                        </Badge>
                      </HStack>
                    </Table.Cell>

                    <Table.Cell>
                      <Stack gap={0}>
                        <Text fontSize="sm" fontWeight="medium">
                          {user.company.name}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          {user.company.department}
                        </Text>
                      </Stack>
                    </Table.Cell>

                    <Table.Cell>
                      <Text fontSize="sm" color="gray.600">
                        {user.address.city}، {user.address.country}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Flex justify="center" align="center" gap={3}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              قبلی
            </Button>

            <HStack gap={1}>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2
                )
                .map((p, idx, arr) => (
                  <>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <Text key={`dots-${p}`} color="gray.400">
                        ...
                      </Text>
                    )}
                    <Button
                      key={p}
                      size="sm"
                      colorPalette={page === p ? 'blue' : 'gray'}
                      variant={page === p ? 'solid' : 'outline'}
                      onClick={() => setPage(p)}
                      minW="8"
                    >
                      {p}
                    </Button>
                  </>
                ))}
            </HStack>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              بعدی
            </Button>
          </Flex>
        )}

      </Stack>
    </Box>
  )
}

export default UsersPage
