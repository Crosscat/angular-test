describe('whatever', () => {
    fit('test', () => {
        let obj1 = {
            value: false,
            method: () => this.value,
        }

        let obj2 = {
            value: false,
            method: () => true,
        }

        expect(obj1.method()).toBe(false);
        expect(obj2.method()).toBe(true);
        obj2.method = obj1.method;
        expect(obj2.method()).toBe(false);
    });
});
  