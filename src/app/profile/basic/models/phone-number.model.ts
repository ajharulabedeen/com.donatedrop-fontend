export class PhoneNumber {
  private id: string;
  private number: string;

    /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}

    /**
     * Getter $number
     * @return {string}
     */
	public get $number(): string {
		return this.number;
	}

    /**
     * Setter $id
     * @param {string} value
     */
	public set $id(value: string) {
		this.id = value;
	}

    /**
     * Setter $number
     * @param {string} value
     */
	public set $number(value: string) {
		this.number = value;
	}

}
