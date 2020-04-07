test('Devo conhecer o basico', () => {
    let number = null
    expect(number).toBeNull()
    number = 10
    expect(number).not.toBeNull()
})

test('Trabalhando com objetos', () => {
    const obj = { name: 'Zora', email: 'zora@gmail.com' }
    expect(obj).toHaveProperty('name', 'Zora')
    expect(obj.name).toBe('Zora')

    const obj2 = { name: 'Zora', email: 'zora@gmail.com' }
    expect(obj).toEqual(obj2)
})